#
# add resize_to param to image_tag to create thumbnails 
#
#
# Usage:
# = image_tag item.image, resize_to: '50x30', class: 'thumbnail'
#
module MiddlemanSimpleThumbnailer
  class Extension < Middleman::Extension

    option :cache_dir, 'source/images/.thumbnails', 'Directory (relative to project root) for cached thumbnails.'

    def initialize(app, options_hash={}, &block)
      super
    end

    def after_configuration
      MiddlemanSimpleThumbnailer::Image.options = options
    end

    helpers do

      def image_tag(path, options={})
        resize_to = options.delete(:resize_to)
        return super(path, options) unless resize_to

        image = MiddlemanSimpleThumbnailer::Image.new(path, resize_to, self.config)
        if config.environment == :development
          super("data:#{image.mime_type};base64,#{image.base64_data}", options)
        else
          image.save!
          super(image.resized_img_path, options)
        end
      end

      def image_path(path, options={})
        resize_to = options.delete(:resize_to)
        return super(path) unless resize_to

        image = MiddlemanSimpleThumbnailer::Image.new(path, resize_to, self.config)
        if config.environment == :development
          super(".thumbnails/images/#{image.resized_img_tmp_path}")
        else
          image.save!
          super(image.resized_img_path)
        end
      end

      def image_width(path)
        image = MiddlemanSimpleThumbnailer::Image.new(path, nil, self.config)
        image.width
      end

    end
  end
end

::Middleman::Extensions.register(:middleman_simple_thumbnailer, MiddlemanSimpleThumbnailer::Extension)
