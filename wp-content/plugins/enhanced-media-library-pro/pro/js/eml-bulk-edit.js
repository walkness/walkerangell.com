window.wp = window.wp || {};
window.eml = window.eml || { l10n: {} };

( function( $, _ ) {
    
    var media = wp.media,
        Attachments = media.model.Attachments,
        l10n = media.view.l10n,
        original = {};
        
        
        
        
    _.extend( eml.l10n, wpuxss_eml_pro_bulk_edit_l10n );

    
      

    // Media Models

    _.extend( media.model.Selection.prototype, {
        
        bulkSave: function( data, options ) {

            var attachments = this.models;

            return media.post( 'eml-save-attachments', _.defaults({
                nonce: eml.l10n.bulk_edit_nonce,   
            }, data ) ).done( function( resp, status, xhr ) {                
                _.each( attachments, function( attachment ) {                    
                    attachment.set( attachment.parse( resp[attachment.id], xhr ), options );
                });
            });
        },
        
        bulkDelete: function( data, options ) {

            var attachments = this;

            return media.post( 'eml-remove-attachments', _.defaults({
                nonce: eml.l10n.bulk_edit_nonce
            }, data ) );
        }
    });
    
    
    
    
    // Media Views

    var newEvents = { 'click .edit': 'emlEditAttachment' };
    _.extend( newEvents, media.view.Attachment.prototype.events);
    
    _.extend( media.view.Attachment.prototype, {
        
        template:  media.template('attachment-grid-view'),
        
        events: newEvents,
        
        emlEditAttachment: function( event ) {
            
            if ( this.controller.isModeActive( 'eml-grid' ) ) {
                if ( this.controller.isModeActive( 'edit' ) ) {

                    this.controller.trigger( 'edit:attachment', this.model);
                    
                    event.stopPropagation();
                    return;
                }
            }
        },
        
        // TODO: reconsider this along with whole single / unsingle / bulk mechanism
        checkClickHandler: function( event ) {

            var selection = this.options.selection;
            
            if ( ! selection ) {
                return;
            }
            
            event.stopPropagation();
            
            if ( selection.where( { id: this.model.get( 'id' ) } ).length ) {
                selection.remove( this.model );
                
                this.$el.focus();
            } else {
                selection.reset();
                selection.add( this.model );
                
            }
            selection.trigger( 'selection:unsingle', selection.model, selection );
            selection.trigger( 'selection:single', selection.model, selection );
        }
    });

    
    
    
    _.extend( media.view.Attachment.Library.prototype, {
        buttons: {
            check: true
        }
    });
    
      
    

    _.extend( media.view.Selection.prototype, {
        
        _stopSelecting: false,
        
        template:  media.template('media-bulk-selection'),
        
        events: {
            'click .edit-selection'  : 'edit',
            'click .clear-selection' : 'clear',
            'click .select-all'      : 'selectAll',
            'click .delete-selected' : 'deleteSelected'
        },
        
        clear: function( event ) {
            
            var library = this.controller.state().get('library'),
                spinner = this.controller.content.get().toolbar.get('spinner');
            
            event.preventDefault();
            
            this.collection.reset();
            this._stopSelecting = true;

            // Keep focus inside media modal
            if ( this.controller.modal ) {
                this.controller.modal.focusManager.focus();
            }
        },
        
        selectAll: function( event ) {
            
            var library = this.controller.state().get('library'),
                selection = this.collection,
                spinner = this.controller.content.get().toolbar.get('spinner'),
                self = this;

            if ( event ) {
                event.preventDefault();
            }
            
            if ( ! library.length || spinner.spinnerTimeout ) {
                return;
            }
            
            this._stopSelecting = false;

            selection.reset( library.models );
            
            selection.trigger( 'selection:unsingle', selection.model, selection );
            selection.trigger( 'selection:single', selection.model, selection );

            if ( library.hasMore() ) {
                
                spinner.show();
                loadAll();
            }
            
            function loadAll() {
                
                library.more().done( function( resp ) {
                    
                    if ( self._stopSelecting ) { 

                        selection.reset();
                        spinner.hide();
                    }
                    else {
                    
                        selection.reset( this.models );
                        
                        selection.trigger( 'selection:unsingle', selection.model, selection );
                        selection.trigger( 'selection:single', selection.model, selection );
                        
                        if ( this._hasMore ) {
                            spinner.show();
                            loadAll();
                        }
                        else {
                            spinner.hide();
                        }
                    }
                });
            }
        },
        
        deleteSelected: function( event ) {

            // TODO: reconsider if we really need chunks
            var data = {}, size = 500, chunks = [], atts = {},
                selection = this.collection,
                library = this.controller.state().get( 'library' ),
                spinner = this.controller.content.get().toolbar.get('spinner'),
                modal = this.controller.modal;

            if ( event ) {
                event.preventDefault();
            }
            
            if ( ! selection.length || spinner.spinnerTimeout ) {
                return;
            }
            
            if ( ! media.view.settings.mediaTrash && ! confirm( l10n.warnBulkDelete ) ) {
                return;
            }
            
            while ( selection.models.length ) {
                chunks.push( selection.models.splice( 0, size ) );
            }
            
            _.extend( atts, selection);

            // restore selection.models
            selection.models = $.map( chunks, function( c ) {
                return c;
            });
            
            chunkReset();
            spinner.show();
            deleteAll();
                
            // Clean queries' cache regardless of all or some might be deleted
            media.model.Query.cleanQueries();
            
            function deleteAll() {
                
                atts.bulkDelete( data ).done( function( resp) {
                    
                    _.each( resp, function( att, id ) {
                        selection.remove( id );
                        library.remove( id );
                    });
                    
                    chunks.shift();
                    
                    if ( chunks.length ) {
                        
                        chunkReset();
                        spinner.show();
                        deleteAll();
                        
                    } else {
                        
                        spinner.hide();
                        selection.reset();
                        
                        // Clean queries' cache
                        media.model.Query.cleanQueries();
                        
                        // Keep focus inside media modal
                        if ( ! _.isUndefined( modal ) ) {
                            modal.focusManager.focus();
                        }
                    }
                    
                }).fail( function() {
                    
                    // TODO: add failure message

                });
            }
            
            function chunkReset() {
                
                atts.reset( chunks[0] );
                selection.remove( chunks[0] );
                data = _.extend( {} ); 

                _.each( atts.models, function( attachment ) {      
                    data[ 'attachments['+attachment.id+']' ] = attachment.id;
                });
            }
        }
    });
    
    
    
    
    
    original.AttachmentFilters = {
        
        All: { 
            createFilters: media.view.AttachmentFilters.All.prototype.createFilters 
        }
    };
    
    _.extend( media.view.AttachmentFilters.All.prototype, {
        
        createFilters: function() {
            
            original.AttachmentFilters.All.createFilters.apply( this, arguments );
            
            if ( media.view.settings.mediaTrash && 
                ( this.controller.isModeActive( 'eml-bulk-edit' ) || 
                this.controller.isModeActive( 'eml-grid' ) ) ) {

                this.filters.trash = {
                    text:  l10n.trash,
                    props: {
                        uploadedTo : null,
                        status     : 'trash',
                        type       : null,
                        orderby    : 'date',
                        order      : 'DESC'
                    },
                    priority: 70
                };
            }
        }        
    });
    
    
    
    
    // TODO: revise all AttachmentsBrowser code
    _.extend( media.view.AttachmentsBrowser.prototype, {
        
        createSingle: function() {

            var sidebar = this.sidebar,
                selection = this.options.selection,
                single = selection.single(),
                taxonomies = {}; 
                
             
            if ( selection.length > 1 && 
                ( parseInt( eml.l10n.is_tax_compat ) || 
                  this.views.parent.isModeActive( 'eml-grid' ) || 
                  this.views.parent.isModeActive( 'eml-bulk-edit' ) ) ) {
                
                sidebar.set( 'bulk-edit', new media.view.emlAttachmentsDetails({
                    controller : this.controller,
                    model      : single,
                    priority   : 80
                }) ); 
                
                // TODO: find a better solution
                if ( this.controller.isModeActive( 'select' ) ) {
                    $sidebar_el = sidebar.$el;
                    $.each( eml.l10n.compat_taxonomies_to_hide, function( id, taxonomy ) {
                        $sidebar_el.find( 'table.compat-attachment-fields tr.compat-field-'+taxonomy ).remove();
                    });
                }             
                
                _.each( selection.models, function( attachment ) {                     
                    
                    _.each( attachment.get('taxonomies'), function( term_ids, taxonomy ) {
                        
                        if ( ! ( taxonomy in taxonomies ) )
                            taxonomies[taxonomy] = {};
                        
                        $.each( term_ids, function( id, term_id ) {
                        
                            if ( ! ( term_id in taxonomies[taxonomy] ) ) 
                                taxonomies[taxonomy][term_id] = 1;
                            else
                                taxonomies[taxonomy][term_id]++;
                        });
                    });
                });
                
                _.each( taxonomies, function( term_ids, taxonomy ) {
                    
                    _.each( term_ids, function( count, term_id ) {

                        if ( count == selection.length ) {
                            
                            $('.attachments-details .term-list input[name="tax_input['+taxonomy+']['+term_id+']"]').prop('checked',true).prop('indeterminate',false);
                            
                        } else if ( count > 0 && count < selection.length ) {
                            
                            $('.attachments-details .term-list input[name="tax_input['+taxonomy+']['+term_id+']"]').prop('checked',true).prop('indeterminate',true);
                            
                        }
                    });
                });
                
                

                sidebar.$el.find( 'input[type=checkbox]' ).each( function() {

                    if ( $( this ).prop( 'checked' ) && ! $( this ).prop( 'indeterminate' ) ) {
                        $( this ).attr( 'title', eml.l10n.toolTip_all )
                        .parent( 'label' ).attr( 'title', eml.l10n.toolTip_all ); 
                    }
                    
                    if ( $( this ).prop( 'checked' ) && $( this ).prop( 'indeterminate' ) ) {
                         $( this ).attr( 'title', eml.l10n.toolTip_some )
                         .parent( 'label' ).attr( 'title', eml.l10n.toolTip_some );  
                    }
                    
                    if ( ! $( this ).prop( 'checked' ) && $( this ).prop( 'indeterminate' ) ) {
                        $( this ).prop( 'indeterminate', false );
                    }
                    
                    if ( ! $( this ).prop( 'checked' ) && ! $( this ).prop( 'indeterminate' ) ) {
                         $( this ).attr( 'title', eml.l10n.toolTip_none )
                         .parent( 'label' ).attr( 'title', eml.l10n.toolTip_none ); 
                    }
                });
            }
            else 
            {  
                if ( this.views.parent && this.views.parent.isModeActive( 'eml-grid' ) ) {
                    
                    sidebar.set( 'details', new media.view.Attachment.emlGridViewDetails({
                        controller: this.controller,
                        model:      single,
                        priority:   80
                    }) );
                } 
                else {     
                
                    sidebar.set( 'details', new media.view.Attachment.Details({
                        controller: this.controller,
                        model:      single,
                        priority:   80
                    }) );
                }
    
                sidebar.set( 'compat', new media.view.AttachmentCompat({
                    controller: this.controller,
                    model:      single,
                    priority:   120
                }) );
    
                if ( this.options.display ) {
                    sidebar.set( 'display', new media.view.Settings.AttachmentDisplay({
                        controller:   this.controller,
                        model:        this.model.display( single ),
                        attachment:   single,
                        priority:     160,
                        userSettings: this.model.get('displayUserSettings')
                    }) );
                }
            }
            
            // Show the sidebar on mobile
            if ( this.model.id === 'insert' ) {
                sidebar.$el.addClass( 'visible' );
            }
        },

        disposeSingle: function() {
            
            var sidebar = this.sidebar;
            
            sidebar.unset('details');
            sidebar.unset('compat');
            sidebar.unset('display');
            sidebar.unset('bulk-edit');
            
            // Hide the sidebar on mobile
            sidebar.$el.removeClass( 'visible' );
        },
        
        createToolbar: function() {
            
            var LibraryViewSwitcher, Filters, toolbarOptions,
                self = this,
                i = 1;

            toolbarOptions = {
                controller: this.controller
            };

            if ( this.controller.isModeActive( 'grid' ) || 
                this.controller.isModeActive( 'eml-grid' ) ) {
                    
                toolbarOptions.className = 'media-toolbar wp-filter';
            }

            /**
            * @member {wp.media.view.Toolbar}
            */
            this.toolbar = new media.view.Toolbar( toolbarOptions );

            this.views.add( this.toolbar );

            this.toolbar.set( 'spinner', new media.view.Spinner({
                priority: -60
            }) );

            if ( ! this.controller.isModeActive( 'eml-bulk-edit' ) &&
                ( -1 !== $.inArray( this.options.filters, [ 'uploaded', 'all' ] ) || 
                parseInt( eml.l10n.force_filters ) ) ) {

                this.toolbar.set( 'filtersLabel', new media.view.Label({
                    value: l10n.filterByType,
                    attributes: {
                        'for':  'media-attachment-filters'
                    },
                    priority:   -80
                }).render() );

                if ( 'uploaded' === this.options.filters ) {
                    this.toolbar.set( 'filters', new media.view.AttachmentFilters.Uploaded({
                        controller: this.controller,
                        model:      this.collection.props,
                        priority:   -80
                    }).render() );
                } else {
                    Filters = new media.view.AttachmentFilters.All({
                        controller: this.controller,
                        model:      this.collection.props,
                        priority:   -80
                    });

                    this.toolbar.set( 'filters', Filters.render() );
                }
            }

            if ( this.controller.isModeActive( 'grid' ) ||
                this.controller.isModeActive( 'eml-grid' ) ) {
                    
                LibraryViewSwitcher = media.View.extend({
                    className: 'view-switch media-grid-view-switch',
                    template: media.template( 'media-library-view-switcher')
                });

                this.toolbar.set( 'libraryViewSwitcher', new LibraryViewSwitcher({
                    controller: this.controller,
                    priority: -90
                }).render() );
            }
            
            if ( ! this.controller.isModeActive( 'eml-bulk-edit' ) &&
                ( -1 !== $.inArray( this.options.filters, [ 'uploaded', 'all' ] ) || 
                parseInt( eml.l10n.force_filters ) ) ) {

                this.toolbar.set( 'dateFilterLabel', new media.view.Label({
                    value: l10n.filterByDate,
                    attributes: {
                        'for': 'media-attachment-date-filters'
                    },
                    priority: -75
                }).render() );
                this.toolbar.set( 'dateFilter', new media.view.DateFilter({
                    controller: this.controller,
                    model:      this.collection.props,
                    priority: -75
                }).render() );
            }
            
            if ( ! this.controller.isModeActive( 'eml-bulk-edit' ) && 
                ( -1 !== $.inArray( this.options.filters, [ 'uploaded', 'all', 'eml' ] ) ||
                parseInt( eml.l10n.force_filters ) ) ) {
                
                $.each( eml.l10n.taxonomies, function( taxonomy, values ) {
                    
                    if ( values.term_list ) {
                        
                        self.toolbar.set( taxonomy+'FilterLabel', new media.view.Label({
                            value: eml.l10n.filter_by + values.singular_name,
                            attributes: {
                                'for':  'media-attachment-' + taxonomy + '-filters',
                            },
                            priority: -70 + i++
                        }).render() );
                        self.toolbar.set( taxonomy+'-filter', new media.view.AttachmentFilters.Taxonomy({
                            controller: self.controller,
                            model: self.collection.props,
                            priority: -70 + i++,
                            taxonomy: taxonomy, 
                            termList: values.term_list,
                            singularName: values.singular_name,
                            pluralName: values.plural_name
                        }).render() );
                    }
                });
                
                this.toolbar.set( 'resetFilterButton', new media.view.Button.resetFilters({
                    controller: this.controller,
                    text: eml.l10n.reset_filters,
                    disabled: true,
                    priority: -70 + i++
                }).render() );
            }
            
            if ( this.controller.isModeActive( 'grid' ) ) {
                
                // BulkSelection is a <div> with subviews, including screen reader text
                this.toolbar.set( 'selectModeToggleButton', new media.view.SelectModeToggleButton({
                    text: l10n.bulkSelect,
                    controller: this.controller,
                    priority: -70
                }).render() );

                this.toolbar.set( 'deleteSelectedButton', new media.view.DeleteSelectedButton({
                    filters: Filters,
                    style: 'primary',
                    disabled: true,
                    text: media.view.settings.mediaTrash ? l10n.trashSelected : l10n.deleteSelected,
                    controller: this.controller,
                    priority: -60,
                    click: function() {
                        var model, changed = [], self = this,
                            selection = this.controller.state().get( 'selection' ),
                            library = this.controller.state().get( 'library' );

                        if ( ! selection.length ) {
                            return;
                        }

                        if ( ! media.view.settings.mediaTrash && ! confirm( l10n.warnBulkDelete ) ) {
                            return;
                        }

                        if ( media.view.settings.mediaTrash &&
                            'trash' !== selection.at( 0 ).get( 'status' ) &&
                            ! confirm( l10n.warnBulkTrash ) ) {

                            return;
                        }

                        while ( selection.length > 0 ) {
                            model = selection.at( 0 );
                            if ( media.view.settings.mediaTrash && 'trash' === model.get( 'status' ) ) {
                                model.set( 'status', 'inherit' );
                                changed.push( model.save() );
                                selection.remove( model );
                            } else if ( media.view.settings.mediaTrash ) {
                                model.set( 'status', 'trash' );
                                changed.push( model.save() );
                                selection.remove( model );
                            } else {
                                model.destroy();
                            }
                        }

                        if ( changed.length ) {
                            $.when.apply( null, changed ).then( function() {
                                library._requery( true );
                                self.controller.trigger( 'selection:action:done' );
                            } );
                        } else {
                            this.controller.trigger( 'selection:action:done' );
                        }
                    }
                }).render() );
            }

            if ( this.options.search ) {

                this.toolbar.set( 'searchLabel', new media.view.Label({
                    value: l10n.searchMediaLabel,
                    attributes: {
                        'for': 'media-search-input'
                    },
                    priority:   60
                }).render() );
                this.toolbar.set( 'search', new media.view.Search({
                    controller: this.controller,
                    model:      this.collection.props,
                    priority:   60
                }).render() );
            }

            if ( this.options.dragInfo ) {
                this.toolbar.set( 'dragInfo', new media.View({
                    el: $( '<div class="instructions">' + l10n.dragInfo + '</div>' )[0],
                    priority: -40
                }) );
            }

            if ( this.options.suggestedWidth && this.options.suggestedHeight ) {
                this.toolbar.set( 'suggestedDimensions', new media.View({
                    el: $( '<div class="instructions">' + l10n.suggestedDimensions + ' ' + this.options.suggestedWidth + ' &times; ' + this.options.suggestedHeight + '</div>' )[0],
                    priority: -40
                }) );
            }
        },
        
        updateContent: function() {
            
            var view = this,
                noItemsView;

            if ( this.controller.isModeActive( 'grid' ) || 
                 this.controller.isModeActive( 'eml-grid' ) ) {
                noItemsView = view.attachmentsNoResults;
            } else {
                noItemsView = view.uploader;
            }

            if ( ! this.collection.length ) {
                
                this.toolbar.get( 'spinner' ).show();
                
                this.dfd = this.collection.more().done( function() {   
                                 
                    if ( ! view.collection.length ) {
                        noItemsView.$el.removeClass( 'hidden' );
                    } else {
                        noItemsView.$el.addClass( 'hidden' );
                    }
                    view.toolbar.get( 'spinner' ).hide();
                } );
                
            } else {
                
                noItemsView.$el.addClass( 'hidden' );
                view.toolbar.get( 'spinner' ).hide();
            }
        },
        
        createUploader: function() {

            this.uploader = new media.view.UploaderInline({
                controller: this.controller,
                status:     false,
                message:    this.controller.isModeActive( 'grid' ) || this.controller.isModeActive( 'eml-grid' ) ? '' : l10n.noItemsFound,
                canClose:   this.controller.isModeActive( 'grid' ) || this.controller.isModeActive( 'eml-grid' )
            });
            
            this.uploader.hide();
            this.views.add( this.uploader );
        },
        
        createAttachments: function() {
            this.attachments = new media.view.Attachments({
                controller:           this.controller,
                collection:           this.collection,
                selection:            this.options.selection,
                model:                this.model,
                sortable:             this.options.sortable,
                scrollElement:        this.options.scrollElement,
                idealColumnWidth:     this.options.idealColumnWidth,

                // The single `Attachment` view to be used in the `Attachments` view.
                AttachmentView: this.options.AttachmentView
            });

            // Add keydown listener to the instance of the Attachments view
            this.attachments.listenTo( this.controller, 'attachment:keydown:arrow',     this.attachments.arrowEvent );
            this.attachments.listenTo( this.controller, 'attachment:details:shift-tab', this.attachments.restoreFocus );

            this.views.add( this.attachments );


            if ( this.controller.isModeActive( 'grid' ) || 
                this.controller.isModeActive( 'eml-grid' ) ) {
                    
                this.attachmentsNoResults = new media.View({
                    controller: this.controller,
                    tagName: 'p'
                });

                this.attachmentsNoResults.$el.addClass( 'hidden no-media' );
                this.attachmentsNoResults.$el.html( l10n.noItemsFound );

                this.views.add( this.attachmentsNoResults );
            }
        }
    });
        
        
        
        
    media.view.emlAttachmentsDetails = media.View.extend({
        
        tagName   : 'div',
        className : 'attachments-details',
        template  : media.template( 'attachments-details' ),
        
        attributes: {
            tabIndex: 0
        },
        
        events: {
            'submit'       : 'preventDefault',
            //'change input' : 'preSave',
            // using click instead of change 
            // because some browsers don't change 'checked' when clicking on 'indeterminate'
            'click input'  : 'preSave',
            
            // possibly more fields for future
            //'change select'   : wpuxss_eml_pro_bulkedit_savebutton_off == 1 ? 'save' : '',
            //'change textarea' : wpuxss_eml_pro_bulkedit_savebutton_off == 1 ? 'save' : ''
        },
        
        initialize: function() {
            
            var $primaryToolbar = this.controller.toolbar.get().primary.$el;
            
            // TODO: use media.view instead            
            if ( ! parseInt( eml.l10n.bulk_edit_save_button_off ) && _.isUndefined( this.$saveButton ) ) 
            {
                $primaryToolbar.prepend( '<div id="eml-bulk-save-changes-success" class="updated"><p><strong>'+eml.l10n.saveButton_success+'</strong></p></div> <div id="eml-bulk-save-changes-failure" class="error"><p>'+eml.l10n.saveButton_failure+'</p></div> <span id="eml-bulk-save-changes-spinner" class="spinner"></span> <a href="#" class="button media-button button-primary button-large eml-button-bulk-save-changes">'+eml.l10n.saveButton_text+'</a>' );

                this.$saveButton = $primaryToolbar.find('.eml-button-bulk-save-changes');
                this.$errorMessage = $primaryToolbar.find('#eml-bulk-save-changes-failure').hide();
                this.$successMessage = $primaryToolbar.find('#eml-bulk-save-changes-success').hide(); 
            }
            
            if ( parseInt( eml.l10n.bulk_edit_save_button_off ) && _.isUndefined( this.spinner ) )
            {
                $primaryToolbar.prepend( '<span id="eml-bulk-save-changes-spinner" class="spinner"></span>' );
            } 
            
            this.spinner = new media.view.Spinner({
                el: $primaryToolbar.find('#eml-bulk-save-changes-spinner'),
                delay: 0
            });
            
            if ( eml.l10n.wp_version < '4.2' )
            {
                this.spinner.$el.hide();
            }
            
            if ( ! parseInt( eml.l10n.bulk_edit_save_button_off ) ) 
            {
                this.$saveButton.on( 'click', _.bind( this.save, this ) );
            } 
            
            this.on( 'ready', this.disableCheckboxes, this );

            wp.Uploader.queue.on( 'reset', this.enableCheckboxes, this );
        },
        
        disableCheckboxes: function() {
            
            if ( wp.Uploader.queue.length ) {
                this.$el.find('input').prop('disabled', true);
            }
        },

        enableCheckboxes: function() {
            
            if ( ! wp.Uploader.queue.length ) {
                this.$el.find('input').prop('disabled', false);
            }
        },

        remove: function() {
            
            var result;
            
            if ( ! _.isUndefined( this.$saveButton ) ) {
                
                this.$saveButton.off( 'click' );
                
                this.$saveButton.remove();
                this.spinner.$el.remove();
                this.$errorMessage.remove();
                this.$successMessage.remove();
            }
            
            result = media.View.prototype.remove.apply( this, arguments );
            
            return result;
        },
        
        preSave: function( event ) {
            
            var $checkbox = $( event.currentTarget );
            
            this.$checkbox = $checkbox;
            
            $checkbox.prop( 'indeterminate', false );
            $checkbox.prev( 'input' ).prop( 'indeterminate', false );
             
            if ( $checkbox.prop( 'checked' ) ) {
                $checkbox.attr( 'title', eml.l10n.toolTip_all )
                .parent( 'label' ).attr( 'title', eml.l10n.toolTip_all ); 
            } else {
                $checkbox.attr( 'title', eml.l10n.toolTip_none )
                .parent( 'label' ).attr( 'title', eml.l10n.toolTip_none ); 
            } 
            
            if ( parseInt( eml.l10n.bulk_edit_save_button_off ) ) {
                this.save();
            }
        },
        
        save: function( event ) {

            var data = {},
                $form = this.$el.children('form.compat-item'),
                attachments = this.controller.state().get( 'selection' ),
                $successMessage = this.$successMessage,
                $errorMessage = this.$errorMessage,
                spinner = this.spinner,
                $checkbox = this.$checkbox,
                ids = [];
                

            
            if ( event ) {
                event.preventDefault();
            }
            
            if ( ! attachments.length ) {
                return;
            }

            _.each( $form.serializeArray(), function( pair ) 
            {   
                data[ pair.name ] = [ pair.value, $form.find('input[name="'+pair.name+'"]').prop('indeterminate') ];
            });
            
            ids = $.map( attachments.models, function( attachment ) {
                return attachment.id;
            });

            _.each( ids, function( id ) {      
                data[ 'attachments['+id+']' ] = id;
            });

            
            spinner.show();
            $( 'input', $form).prop('disabled', true);

 
            attachments.bulkSave( data ).always( function() {

                spinner.hide();
                $( 'input', $form).prop('disabled', false);
                
            }).done( function() {
                
                if ( ! parseInt( eml.l10n.bulk_edit_save_button_off ) ) 
                {
                    $successMessage.fadeIn( 400 );
                    setTimeout( function() {
                        $successMessage.fadeOut( 400 );
                    }, 4000 );
                }
                
            }).fail( function() {
                
                if ( ! parseInt( eml.l10n.bulk_edit_save_button_off ) ) 
                {
                    $errorMessage.fadeIn( 400 );
                    setTimeout( function() {
                        $errorMessage.fadeOut( 400 );
                    }, 4000 );
                }
                
            });
                
            // Clean queries' cache regardless of all or some might be changed
            media.model.Query.cleanQueries();
        },

        preventDefault: function( event ) {
            event.preventDefault();
        }
    });
    
    
    
    $( document ).ready( function() {
        
        // TODO: find a better place for this
        $( document ).on( 'mousedown', '.media-frame .attachments-browser .attachments li', function ( event ) {

            if ( event.ctrlKey || event.shiftKey ) {
                event.preventDefault();
            }
        });
    });    
    
    
    
})( jQuery, _ );