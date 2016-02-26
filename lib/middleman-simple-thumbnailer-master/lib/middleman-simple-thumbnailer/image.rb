require "digest"

module MiddlemanSimpleThumbnailer
  class Image
    @@all_objects = []
    @@options = nil

    attr_accessor :img_path, :middleman_config, :resize_to, :hash

    def initialize(img_path, resize_to, middleman_config)
      @@all_objects << self

      @img_path = img_path
      @resize_to = resize_to
      @middleman_config = middleman_config

      @hash = middleman_config.environment != :development
    end

    def mime_type
      image.mime_type
    end

    def resized_img_path
      img_path.gsub(image_name, resized_image_name)
    end

    def resized_img_tmp_path
      unless cached_thumbnail_available?
        resize!
        save_cached_thumbnail
      end
      img_path.gsub(image_name, resized_image_name).split('.').tap { |a|
        a.insert(-2, image_checksum)
      }.join('.')
    end

    def base64_data
      unless cached_thumbnail_available?
        resize!
        save_cached_thumbnail
      end
      Base64.encode64(File.read(cached_resized_img_abs_path))
    end

    def save!
      resize!
      image.write(resized_img_abs_path)
    end

    def self.all_objects
      @@all_objects
    end

    def self.options=(options)
      @@options = options
    end
    
    
    private
    
    def resize!
      unless @already_resized
        image.resize(resize_to)
        @already_resized = true
      end
    end

    def image
      @image ||= MiniMagick::Image.open(abs_path)
    end

    def image_checksum
      @image_checksum ||= Digest::SHA2.file(abs_path).hexdigest[0..16]
    end

    def image_asset_hash
      @image_asset_hash ||= Digest::SHA1.file(abs_path).hexdigest[0..7]
    end

    def image_name
      File.basename(abs_path)
    end

    def resized_image_name
      file_name = File.basename(image_name, '.*')
      ext = File.extname(image_name)
      _resized_image_name = file_name
      if hash
        _resized_image_name << "-#{image_asset_hash}"
      end
      if resize_to
        _resized_image_name << "-#{resize_to}"
      end
      _resized_image_name << ext
      _resized_image_name.gsub(/[%@!<>^]/, '>' => 'gt', '<' => 'lt', '^' => 'c')  # sanitize file name
    end

    def abs_path
      File.join(source_dir, middleman_abs_path)
    end

    def middleman_abs_path
      img_path.start_with?('/') ? img_path : File.join(images_dir, img_path) 
    end

    def resized_img_abs_path
      File.join(build_dir, middleman_abs_path).gsub(image_name, resized_image_name)
    end

    def cached_resized_img_abs_path
      File.join(cache_dir, middleman_abs_path).gsub(image_name, resized_image_name).split('.').tap { |a|
        a.insert(-2, image_checksum)
      }.join('.')
    end
    
    def cached_thumbnail_available?
      File.exist?(cached_resized_img_abs_path)
    end
   
    def save_cached_thumbnail
      FileUtils.mkdir_p(File.dirname(cached_resized_img_abs_path))
      image.write(cached_resized_img_abs_path)
    end
    
    def source_dir
      middleman_config[:source]
    end

    def images_dir
      middleman_config[:images_dir]
    end

    def build_dir
      middleman_config[:build_dir]
    end

    def cache_dir
      @@options.cache_dir
    end
  end
end