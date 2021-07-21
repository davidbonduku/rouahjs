/*!
 * R.js v1.0
 * (c) 2016-2017 David BONDUKU
 * Released under the MIT License.
 */
(function ( global, factory ) {

    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define( factory ) :
            ( global.R = factory() );

}(this, (function(){'use strict';
    /**
     *
     * @type {{version: string}|*}
     */
    var R = R || {
            version: '1.0.beta',
            author:'David BONDUKU PIEME'
        };
    /**
     * R DOM Interface
     * @type {{}}
     */
    R.DOM = {};

    /**
     * DOM render
     * @param element
     * @param node
     */
    R.DOM.render = function( element, node ){};

    /**
     * Audio Interface
     * @type {{}}
     */
    R.sound = {};

    /**
     * Video Interface
     * @type {{}}
     */
    R.video = {};
    /**
     * Ajax Interface
     * @type {{}}
     */
    R.http = {};
    /**
     * components Interface
     * @type {{}}
     */
    R.components = {};
    /**
     *Services Interface
     * @type {{}}
     */
    R.services = {};

    /**
     * Utilities Interface
     * @type {{}}
     */
    R.utils = {};

    /**
     * Cache Interface
     * @type {{}}
     */
    R.cache = {};

    /**
     * Router Interface
     * @type {{}}
     */
    R.router = {};
    /**
     * Create Element
     * @param tag
     * @param props
     * @param content
     */
    R.createElement = function ( tag, props, content ) {};
    /**
     * Create Component
     * @param {String} name
     * @param props
     * @param {Function} props.didMount
     * @param {Function} props.didUpdated
     * @param {Function} props.render
     * @param {Object} props.state
     * @param {Array} props.messages
     * @param {Function} props.onmessage
     */
    R.createComponent = function( name, props ){};

    return R;

})));

(function(app, undefined){'use strict';

    /**
     * CreateElement
     * @param tag
     * @param props
     * @param content
     * @returns {HTMLElement}
     */

    app.createElement = function ( tag, props, content )
    {
        var _element = _createElement( tag );

        _addProperties( _element, props || {} );
        _addContent( _element, content );

        return _element;
    };
    /**
     * Create Factory
     * @param type
     * @returns {any}
     */
    app.createFactory = function ( type )
    {
        return app.createElement.bind(null,type);
    };


    /**
     *
     * @param tag
     * @returns {HTMLElement}
     * @private
     */
    var _createElement = function ( tag )
    {
        return document.createElement( tag );
    };
    /**
     *
     * @param element
     * @param props
     * @private
     */
    var _addProperties = function ( element, props )
    {
        try{

            if( Array.isArray( props )
                || (typeof props === 'string')
                || (typeof props === 'number' )
            )
            {
                app.utils.log( "Object type expected!" );
            }else{

                for( var prop in props )
                {
                    if( props.hasOwnProperty( prop ) )
                    {
                        if( _isDataAttributes( prop ) )
                        {

                            element.dataset[ _extractDataAttributes( prop ) ] = props[ prop ];

                        }else if( !_isDataAttributes( prop ))
                        {
                            element[ prop ] = props[ prop ];
                        }
                    }
                }
            }
        }catch( error ){
            app.utils.log( error );
        }
    };
    /**
     * is Data Attribute
     * @param data
     * @returns {boolean}
     * @private
     */
    var _isDataAttributes = function ( data )
    {
        return ( data.indexOf('data') > -1 );
    };
    /**
     * ExtractData
     * @param data
     * @returns {string}
     * @private
     */
    var _extractDataAttributes = function( data )
    {
        if( _isDataAttributes( data ) )
        {
            return data.split('data')[1].toLowerCase();
        }else{
            return '';
        }
    };
    /**
     *
     * @param element
     * @param content
     * @private
     */
    var _addContent = function ( element, content )
    {
        if( content !== null &&
            ( typeof content !== 'string' ) &&
            ( typeof content !== 'number' ) &&
            ( content )
        )
        {
            element.appendChild( content );
        }else{
            element.textContent = content || '';
        }
    };

}(R || {}));
(function( app, undefined ){'use strict';

    /**
     * Render
     * @param {object} element
     * @param {HTMLElement} node
     */
    app.DOM.render = function ( element, node )
    {
        var fragment = document.createDocumentFragment();
        try{
            if( !node.contains( element ) )
            {
                fragment.appendChild( element );
                node.appendChild( fragment );
                fragment = null;
            }
        }catch ( error )
        {
            app.utils.log( error );
        }
    };
    /**
     * UL
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */

    app.DOM.ul = function ( props, content )
    {
        return app.createElement( 'ul', props || {}, content || '' );
    };

    /**
     * replaceElement
     * @param fragment
     * @param element
     * @returns void
     */
    app.DOM.replaceElement=  function (fragment, element )
    {
        try {
          var new_elt = element.cloneNode(true);
          new_elt.innerHTML = '';
          new_elt.appendChild(fragment);
          element.parentNode.replaceChild(new_elt, element);
        } catch (e) {
          console.error(e);
        }

    };
    /**
     * Bolder
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.b = function( props, content )
    {
        return app.createElement( 'b', props || {}, content || '' );
    };

    /**
     * Li
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.li = function ( props, content )
    {
        return app.createElement( 'li', props || {}, content || '' );
    };
    /**
     * IFrame
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.iFrame = function ( props, content )
    {
        return app.createElement( 'iFrame', props || {}, content || '' );
    };
    /**
     * Div
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.div = function (  props, content )
    {
        return app.createElement( 'div', props || {}, content || '' );
    };
    /**
     * P
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */

    app.DOM.p = function ( props, content )
    {
        return app.createElement('p', props || {}, content || '' );
    };
    /**
     * Span
     * @param props
     * @param content
     * @returns {HTMLElement}
     */
    app.DOM.span = function ( props, content )
    {
        return app.createElement('span', props || {}, content || '' );
    };
    /**
     * A anchor
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.a = function ( props, content )
    {
        return app.createElement( 'a', props || {}, content || '' );
    };
    /**
     * Progress
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.progress = function ( props, content )
    {
        return app.createElement( 'progress', props || {}, content || '' );
    };
    /**
     * Input
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.input = function ( props, content )
    {
        return app.createElement( 'input', props || {}, content || '' );
    };
    /**
     * Img
     * @param props
     * @returns {HTMLElement|*}
     */
    app.DOM.img = function ( props )
    {
        props = props || {};
        props.dataSrc = props.src;
        delete props.src;

        return _lazyLoad(  app.createElement( 'img', props, null ) );
    };
    /**
     * Canvas
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.canvas = function ( props, content )
    {
        return app.createElement( 'canvas', props || {}, content || '' );
    };
    /**
     * Audio HTMLElement
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.audio = function ( props, content )
    {
        return app.createElement( 'audio', props || {}, content || '' );
    };
    /**
     * Video HTMLElement
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.video = function ( props, content )
    {
        return app.createElement( 'video', props || {}, content || '' );
    };
    /**
     * InnerHtml
     * @param className
     * @param content
     * @returns {*}
     */
    app.DOM.innerHTML = function ( className, content )
    {
        if( app.findBy({className:className}) !== '' && content )
        {
            app.findBy({className:className}).innerHTML = content;
        }else{
            return app.findBy({className:className}).innerHTML;
        }
    };
    /**
     *
     * @param props
     * @param content
     * @returns {HTMLElement}
     */
    app.DOM.label = function(props, content)
    {
        return app.createElement('label',props || {}, content || null);
    }
    /**
     * FindBy
     * @param options
     * @param options.id
     * @param options.className
     * @param options.componentName
     * @param options.custom
     * @returns {string}
     */
    app.DOM.findBy = function ( options )
    {
        var res = '';
        if( !options ) return;

        if( options.id )
        {
            res = document.getElementById( options.id );
        }else if( options.className )
        {
            res = document.getElementsByClassName( options.className )[0];
        }
        else if( options.componentName )
        {
            res = document.querySelector( "[data-component='"+options.componentName+"']" );
        }
        else if( options.custom )
        {
            res = document.querySelector( options.custom );
        }

        return res;
    };

    /**
     * Append Node to Root Element
     * @param root
     * @param node
     */
    app.DOM.append = function ( root, node )
    {
        try{
            if(!root.contains( node ))
            {
                root.appendChild( node );
            }
        }catch ( error )
        {
            app.utils.log( error );
        }
        return app.DOM;
    };
    /**
     * Append Nodes to Root Element
     * @param root
     * @param nodes
     */
    app.DOM.appends = function ( root, nodes )
    {
        var index,
            length = nodes.length,
            fragment = document.createDocumentFragment();

        try{
            if( Array.isArray( nodes ) )
            {
                for( index = 0; index < length; index++ )
                {
                    if( !root.contains( nodes[ index ] ) )
                    {
                        fragment.appendChild( nodes[index] );
                    }
                }

                root.appendChild( fragment );
                fragment = null;

            }else{
                app.utils.log( 'Array of Nodes Elements expected !' );
            }
        }catch ( error )
        {
            app.utils.log( error );
        }
    };
    /**
     * Remove ChildNode
     * @param root
     * @param node
     */
    app.DOM.remove = function ( root, node )
    {
        try{
            root.removeChild( node );
        }catch ( error )
        {
            app.utils.log( error );
        }
    };
    /**
     * Form
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.form = function ( props, content )
    {
        return app.createElement( 'form', props || {}, content || '' );
    };
    /**
     *
     * @returns {DocumentFragment}
     */
    app.DOM.getFragment = function()
    {
        return document.createDocumentFragment();
    };
    /**
     * Table
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.table = function ( props, content )
    {
        return app.createElement( 'table', props || {}, content || '' );
    };
    /**
     * Button
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */
    app.DOM.button = function ( props, content )
    {
        return app.createElement( 'button', props || {}, content || '' );
    };
    /**
     * Textarea
     * @param props
     * @param content
     * @returns {HTMLElement|*}
     */

    app.DOM.textarea = function( props, content )
    {
        return app.createElement( 'textarea', props || {}, content || '' );
    };
    /**
     * Add Event
     * @param element
     * @param event
     * @param callback
     */
    app.DOM.addListener = function ( element, event, callback )
    {
        element.addEventListener( event, function ( e ){
            callback ( e );
        }, false );
    };
    /**
     * Get Attributes
     * @param element
     * @returns {NamedNodeMap}
     */
    app.DOM.attr = function ( element )
    {
        var _attrib = null;

        try{
            _attrib =  element.attributes;
        }catch ( error ){
            app.utils.log( error );
        }

        return _attrib;
    };

    /**
     *  lazyLoad
     * @param img
     * @returns {*}
     */
    var _lazyLoad = function ( img )
    {
        var image = new Image();
        image.src = img.dataset.src;

        image.onload = function()
        {
            img.src = image.src;
        };
        img.setAttribute('role','presentation');
        return img;
    };

    /**
     * RemoveEvent
     * @param element
     * @param event
     */

    app.DOM.removeEvent = function ( element, event )
    {
        element.removeEventListener( event, function(){}, false );
    };
    /**
     *Reset ParentNode
     * @param parentNode
     */
    app.DOM.resetParentNode = function ( parentNode )
    {
        while( parentNode.firstChild )
        {
            parentNode.removeChild(parentNode.firstChild );
        }
    };

}(R || {}));
(function( app, undefined ){ 'use strict';

    /**
     *
     * @returns {string}
     */
    function getRandomID()
    {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    /**
     * Topics
     * @type {{}}
     * @private
     */

    var _topics = {},
        _props = {
            emit: function( topic, data )
            {
                app.components.publish( topic, data || {} );
            }
        },
        _messages = {
            mount: 'mount',
            unmount: 'unmount',
            destroy: 'destroy'
        };

    /**
     * Create Main Component
     * @param name
     * @param params
     * @returns {HTMLElement}
     * @private
     */

    var _createMainComponent = function ( name, params )
    {
        var _mainComponent = null,
            _oldState = {};

        if( name && name !== "data" )
        {
            params.className = name;
            params.componentId = getRandomID();
            params.emit = app.emit;

            params.state = params.state || {};
            params.didUpdated = params.didUpdated || function(){};
            params.mount = params.mount || function(){};
            params.didMount = params.didMount || function(){};
            params.didUnMount = params.didUnMount || function(){};
            params.resetState = function( state )
            {
                params.state = state;
                _mainComponent.state = params.state;
            };

            params.unMount = function()
            {
                params.didUnMount();
            };

            /**
             * Set the state of component and re-render
             * @param state {Object} state
             * @return void
             */
            params.setState = function ( state )
            {
                _setCurrentState(params.state, {
                    newState: state,
                    oldState: _oldState,
                    onUpdate: function(
                        status,
                        updatedState,
                        updatedOldState
                    )
                    {
                        if(status === 'updated')
                        {
                            params.state = updatedState;
                            _oldState = updatedOldState;
                            _reBuildComponent( params.root, params );
                            params.didUpdated();
                        }
                    }
                } );
            };

            app.utils.extend( params, _props );

            _mainComponent = app.createElement( 'div', params, null );
            params.root = _mainComponent;

            _componentDidMount( params );
        }

        return _mainComponent;
    };



    /***
     *
     * @param current
     * @param options
     * @private
     */
    function _setCurrentState( current, options )
    {
        var newStatekeys = Object.keys( options.newState ),
            currentKeys = Object.keys( current ),
            oldStateKeys = Object.keys( options.oldState ),
            values = Object.values( options.newState ),
            oldStateValues = Object.values( options.oldState ),
            status = '';

       /** if( oldStateKeys.length > 0)
        {
            oldStateKeys.map(function( oldKey, i ){
                newStatekeys.map(function(newKey, j){
                    if( oldKey === newKey )
                    {
                        if( oldStateValues[i] === values[j] )
                        {
                            status = 'notUpdated';

                        }else{
                            options.oldState[oldKey] = values[j];
                            status = 'updated';
                        }
                    }
                });
            });
            current = options.oldState;

        }else{
            currentKeys.map(function( key ){
                newStatekeys.map(function(item, j){
                    if( key === item )
                    {
                        current[ key ] = values[ j ];
                        status = 'updated';
                    }
                });
            });
            options.oldState = current;
        }**/

       if( newStatekeys.length )
       {
           if(currentKeys.length )
           {
               currentKeys.map(function( key ){
                   newStatekeys.map(function(item, j){
                       if( key === item )
                       {
                           current[ key ] = values[ j ];
                           status = 'updated';
                       }
                   });
               });
           }else{
               current = options.newState;
               status = 'updated';
           }

       }else{
           status = 'notUpdated';
       }

        options.onUpdate(
            status,
            current,
            options.oldState
        );
    }

    /**
     *
     * @param param
     * @private
     */



    /**
     *  Add Children
     * @param component
     * @param elements
     * @private
     */

    var _addChildren = function( component, elements )
    {
        var children = [], child;

        for( child in elements )
        {
            if( elements.hasOwnProperty( child ))
            {
                elements[ child ].setState = component.setState;
                elements[ child ].state = component.state;
                children.push( elements[ child ] );

            }
        }

        app.DOM.appends( component, children );
    };

    /**
     *  Listen To Message
     * @param message
     * @param callback
     * @param element
     * @private
     */

    var _onMessage = function ( message, callback, element )
    {
        var item,
            length = message.length;

        for( item = 0; item < length; item++ )
        {
            var _message = message[ item ];
            app.components.subscribe( _message, callback, element );
        }
    };

    /**
     *
     * @param component
     * @param props
     * @private
     */
    function _reBuildComponent( component, props )
    {
        _unsubScribeComponent( props );
        component.innerHTML = '';

        var children = props.render()|| {};
        _addChildren( component,  children );

        children.contextId = component.componentId;
        children.setState = props.setState;

        _onMessage(
            props.messages || [],
            props.onmessage || function(){},
            children
        );
    }

    /**
     *
     * @param component
     * @private
     */
    function _unsubScribeComponent(component)
    {
        if(component.messages)
        {
            component.messages.map(function(message){
                if(message)
                {
                    if(_topics[message] )
                    {
                        _topics[message].map(function(item, index){
                            if(component.componentId.indexOf(item.contextId) >-1)
                            {
                                delete _topics[message][index].children;
                                delete _topics[message][index].listener;
                                delete _topics[message][index].contextId;
                            }
                        });
                    }
                }
            });
        }
    }

    /**
     * Create Component
     * @param {String} name
     * @param props
     * @param {Function} props.didMount
     * @param {Function} props.render
     * @param {Array} props.messages
     * @param {Function} props.onmessage
     */
    app.createComponent = function ( name, props )
    {
        props = props || {};


        var _component = _createMainComponent( name , props ),
            _children = props.render() || {};

        try{

            _addChildren( _component,  _children );

            _children.contextId = _component.componentId;
            _children.setState = _component.setState;

            _onMessage(
                props.messages || [],
                props.onmessage || function(){},
                _children
            );

        }catch ( error )
        {
            app.utils.log( error );
        }

        return _component;
    };

    /**
     * Component Factory
     * @param type {string}
     */
    app.createComponentFactory = function ( type )
    {
        return this.createComponent.bind( null, type );
    };
    /**
     * Subscribe
     * @param topic {string}
     * @param listener {Function}
     * @param element {object}
     */

    app.components.subscribe = function ( topic, listener, element )
    {
        if( !_topics[ topic ] ) _topics[ topic ] = [];

        var contextId = element ? element.contextId: '';

        _topics[ topic ].push({
            listener: listener,
            children: element,
            contextId: contextId
        });
    };
    /**
     * UnMount
     * @param componentName
     */
    app.components.unmount = function ( componentName )
    {
        if( _isValidComponent( componentName ) )
        {
            app.DOM.findBy({componentName:componentName}).setAttribute('style','display:none');

            this.publish( _messages.unmount, {name:componentName} );
        }else{
            app.utils.log("Could not unmount this component, "+componentName+" do not exist !");
        }

    };
    /**
     * Destroy
     * @param componentName
     * @param root
     */
    app.components.destroy = function ( componentName, root )
    {
        var _component  = app.DOM.findBy({componentName:componentName});

        if( root.contains( _component ) )
        {
            root.removeChild( _component );

            this.publish( _messages.destroy, {name:componentName} );
        }else{
            return;
        }
    };
    /**
     * Mount
     * @param componentName
     */
    app.components.mount = function ( componentName )
    {
        if( _isValidComponent( componentName ) )
        {
            app.DOM.findBy({componentName:componentName}).setAttribute('style','display:block !important');
            this.publish( _messages.mount,{name:componentName} );
        }else{
            app.utils.log("Could not mount this component, "+componentName+" do not exist !");
        }
    };
    /**
     *
     * @param componentName
     * @returns {boolean}
     */
    app.components.isComponent = function ( componentName )
    {
        return _isValidComponent( componentName );
    };
    /**
     *
     * @param componentName
     * @returns {boolean}
     * @private
     */
    var _isValidComponent = function ( componentName )
    {
        return ( app.DOM.findBy({componentName:componentName}) !== null );

    };

    /**
     * Publish
     * @param topic
     * @param data
     */
    app.components.publish = function ( topic, data )
    {
        if( !_topics[ topic ] || _topics[topic].length < 1 ) return;

        _topics[ topic ].map(function( component ){
           if(typeof component.listener === 'function')
           {
               component.listener( topic, data || {}, component.children );
           }
        });
    };
    /**
     *
     * @param params
     * @private
     */
    var _componentDidMount = function ( params )
    {
        if( typeof params.didMount === "function" )
        {
            params.didMount();
        }
    };


}(R || {}));
(function( app, undefined){'use strict';

    /**
     * PubSub Interface
     */

    /**
     *
     * @type {HTMLElement}
     * @private
     */
    var _rjsGlobalElement = window.document.documentElement,
        /**
         *
         * @type {Array}
         * @private
         */
        _subscribers = [];
    /**
     * Init Event Interface
     * @private
     */
    var _initRJS = function ()
    {
        _rjsGlobalElement.dataset.rjsVersion = app.version;
    };

    /**
     * Publish
     * @param {String} topic
     * @param {*} data
     */
    var _publish = function ( topic, data )
    {
        if( !_subscribers[ topic ] || _subscribers[ topic ].length < 1 ) return;

        _subscribers[ topic ].map(function( listener ){
            listener( data || {} );
        });

    };
    /**
     * Subscribe
     * @param {String} topic
     * @param {Function} listener
     */
    var _subscribe = function( topic, listener )
    {
        if( !_subscribers[ topic ] ) _subscribers[ topic ] = [];

        _subscribers[ topic ].push( listener );
    };

    /**
     * Dispatch Event
     * @param {String} topic
     * @param {*} data
     */
    app.emit = function ( topic, data )
    {
        _publish( topic, data || {} );

        app.components.publish( topic, data );
    };
    /**
     * Listen
     * @param {String} topic
     * @param {Function} callback
     */
    app.on = function ( topic, callback )
    {
        _subscribe( topic, function ( data ){
            callback ( data );
        });
    };

    _initRJS();

}(R || {}));
(function(app, undefined){'use strict';

    var headers = {
        JSON:'content-type: application/json'
    };

    /**
     *
     * @constructor
     */
    function Network()
    {
        this.xhr = new XMLHttpRequest();
        this.option = {};
    }

    /**
     *
     * @param header
     * @returns {boolean}
     * @private
     */
    function _isJSON( header )
    {
        return header.indexOf( headers.JSON ) > -1;
    }

    /**
     *
     * @param xhr
     * @param callback
     * @private
     */
    function _parseResponse( xhr, callback )
    {
        if( _isJSON( xhr.getAllResponseHeaders()) )
        {
            callback( JSON.parse( xhr.responseText ) );
        }else{
           callback ( xhr.responseText );
        }
    }

    /**
     *
     * @param success
     */
    Network.prototype.success = function( success )
    {
        var that = this;

        this.xhr.onreadystatechange = function ()
        {
            if( that.xhr.readyState == 4 )
            {
               _parseResponse( that.xhr, function( response ){
                   success( response );
               } );
            }
        };

        this.request();

        return this;
    };
    /**
     *
     * @param error
     */
    Network.prototype.catch = function ( error )
    {
        this.xhr.onerror = function () {
            error(this.response);
        };

        return this;
    };
    /**
     *
     * @param error
     * @returns {Network}
     */

    Network.prototype.error = function ( error )
    {
        this.xhr.onerror = function () {
            error(this.response);
        };

        return this;
    };
    /***
     *
     */
    Network.prototype.request = function ()
    {
        if( this.option.data )
        {
            this.xhr.send( this.option.data );

        }else {

            this.xhr.send( null );
        }
    };

    /**
     *
     * @param options
     */
    Network.prototype.prepare = function( options )
    {
        var _method = options.method.toLowerCase();
        this.option = options;
        this.xhr.open( _method, options.url, true );

        return this;
    };

    app.http.net = function(){
        return new Network();
    };

    /**
     * Get
     * @param url
     */
    app.http.get = function ( url )
    {
        return app.http.net().prepare({url: url, method: "get"});
    };
    /**
     * Post
     * @param url
     * @param options
     * @param options.url
     * @param options.data
     */
    app.http.post = function ( url, options )
    {
       return app.http.net().prepare({url: url, method: "post", data: options.data || {} });
    };
    /**
     *  Put
     * @param url
     * @param options
     * @returns {{}}
     */
    app.http.put = function ( url, options )
    {
        return app.http.net().prepare({url: url, method: "put", data: options.data || {} });
    };
    /**
     * Delete
     * @param url
     * @param options
     * @param options.data
     */
    app.http.delete = function (url, options)
    {
        options = options || {};
        return app.http.net().prepare({url: url, method: "delete", data: options.data || {} });
    };


    /**
     *
     * @type {XMLHttpRequest}
     */
    app.http.xhr = app.http.net.xhr;

    // TODO Vérification des erreurs AJAX

}(R || {}));
(function( app, undefined ){'use strict';
    /**
     *  Queue Service
     * @type {Array}
     * @private
     */

    var _servicesQueue = [];
    /**
     *  Add Service
     * @param serviceName
     * @param creator
     * @private
     */
    var _addService = function ( serviceName, creator )
    {
        var callback = creator || function (){};

        if( !serviceName && serviceName !== "" )
        {

            app.utils.log( "Please provide a service name !" );

        }else if( _hasService( serviceName ) )
        {

            app.utils.log( "This service already exist !" );

        }else{

            _servicesQueue.push({
                name:serviceName,
                methods:callback( app.services )
            });
        }
    };
    /**
     * Has Service
     * @param serviceName
     * @private
     */
    var _hasService = function ( serviceName )
    {
        var hasService = false,
            index = 0,
            length = _servicesQueue.length;

        for( index; index < length; index++ )
        {
            if( _servicesQueue[index].name === serviceName  )
            {
                hasService = true;
                break;
            }
        }

        return hasService;
    };

    /**
     *  Add Service
     * @param serviceName
     * @param creator
     */
    app.services.add = function ( serviceName, creator )
    {
        _addService( serviceName, creator );
    };

    /**
     * Has Service
     * @param serviceName
     * @return boolean
     */
    app.services.hasService = function ( serviceName )
    {
        return _hasService( serviceName );
    };

    /**
     * Get Service
     * @param serviceName
     * @returns {{}}
     */
    app.services.get = function ( serviceName )
    {
        if( _hasService( serviceName ))
        {
            return _getMethodsFromService( serviceName );
        }else{
            app.utils.log( "The service "+serviceName+" does not exist !" );
        }

    };
    /**
     * Methods from Service
     * @param serviceName
     * @returns {{}}
     * @private
     */
    var _getMethodsFromService = function ( serviceName )
    {
        var _methods = undefined;

        _servicesQueue.map( function ( service ){

            if( serviceName === service.name )
            {
                _methods = service.methods;
            }
        });

        return _methods;
    };
    /**
     * Get All Services
     * @returns {Array}
     */
    app.services.getAll = function ()
    {
        return _servicesQueue;
    };
    /**
     * Destroy
     * @param serviceName
     */
    app.services.destroy = function ( serviceName )
    {
        if( _hasService( serviceName ) )
        {
            app.utils.log( _getServiceIndex( serviceName ) );
        }
        //TODO finaliser destruction service
    };
    /**
     * Service Index
     * @param serviceName
     * @returns {number}
     * @private
     */
    var _getServiceIndex = function ( serviceName )
    {
        var length = _servicesQueue.length, currentIndex, index;

        for( index = 0; index < length; index++ )
        {
            if( _servicesQueue[index].name == serviceName )
            {
                currentIndex = index;
                break;
            }
        }
        return currentIndex;
    };
    /**
     * Destroy All
     */
    app.services.destroyAll = function ()
    {
        _servicesQueue = [];
    };

}(R || {}));
(function ( app, undefined ){ 'use strict';


    var _routerOptions  =
    {
        appNodeRoot: document.body,
        canIShowLoader: false,
        loaderTimer: 600
    };

    app.router = {
        routes: [],
        mode: null,
        root: '/',
        /**
         * Config
         * @param options
         * @param {String} options.appId
         * @param {String} options.mode
         * @param {boolean} options.showLoader
         * @param {Number} options.loaderTimer
         * @returns {app.router}
         */
        config : function( options )
        {
            this.mode = options && options.mode && options.mode == 'history'
            && !!( history.pushState ) ? 'history' : 'hash';
            this.root = options && options.root ? '/' + this.clearSlashes( options.root ) + '/' : '/';

            _routerOptions.appNodeRoot = document.getElementById( options.appId );
            _routerOptions.canIShowLoader = options.showLoader || _routerOptions.canIShowLoader;
            _routerOptions.loaderTimer = options.loaderTimer || _routerOptions.loaderTimer;

            return this;
        },
        /**
         * Get Fragment
         * @returns {*}
         */
        getFragment: function()
        {
            var fragment = '';
            if( this.mode === 'history' )
            {
                fragment = this.clearSlashes( decodeURI( location.pathname + location.search ) );

                fragment = fragment.replace(/\?(.*)$/, '');
                fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;

            } else {
                var match = window.location.href.match(/#(.*)$/);
                fragment = match ? match[1] : '';
            }

            return this.clearSlashes( fragment );
        },
        /**
         * ClearSlashes
         * @param path
         * @returns {string}
         */
        clearSlashes: function( path )
        {
            var currentPath = path.toString().replace(/\/$/, '').replace(/^\//, '');

            currentPath = '/'+currentPath;

            return currentPath;
        },
        /**
         *  Add Route
         * @param {String} route
         * @param options
         * @param {HTMLElement} options.component
         * @returns {app.router}
         */
        add: function( route, options )
        {
            if( typeof route == 'function' )
            {
                options = route;
                route = '';
            }
            this.routes.push( { re: route, handler: options} );

            return this;
        },
        /**
         * Remove
         * @param param
         * @returns {app.router}
         */
        remove: function( param )
        {
            for( var i = 0, r; i < this.routes.length, r = this.routes[ i ]; i++ )
            {
                if( r.handler === param || r.re.toString() === param.toString() )
                {
                    this.routes.splice(i, 1);
                    return this;
                }
            }
            return this;
        },
        /**
         * Flush Router
         * @returns {app.router}
         */
        flush: function()
        {
            this.routes = [];
            this.mode = null;
            this.root = '/';
            return this;
        },
        /**
         * Check
         * @param path
         * @returns {app.router}
         */
        check: function( path )
        {
            var fragment = path || this.getFragment();

            for( var i = 0; i < this.routes.length; i++ )
            {
                var match = fragment.match( this.routes[ i ].re );

                if( match )
                {
                    match.shift();

                    if( _routerOptions.canIShowLoader )
                    {
                        app.utils.loader.show({wait:_routerOptions.loaderTimer});
                    }
                    _renderComponent( this.routes[i].handler );

                    return this;
                }else{
                    if( this.routes [i])
                    {
                        //delete this.routes[i]
                    }

                }
            }
            return this;
        },
        /**
         * Listen
         * @returns {app.router}
         */
        listen: function()
        {
            var self = this;
            var current = self.getFragment();

            var fn = function()
            {
                if( current !== self.getFragment() )
                {
                    current = self.getFragment();
                    self.check( current );
                }
            };

            clearInterval( this.interval );
            this.interval = setInterval( fn, 500 );

            this.check();

            return this;
        },
        /**
         * Navigate
         * @param path
         * @returns {app.router}
         */
        navigate: function( path )
        {
            path = path ? path : '';

            if( this.mode === 'history' )
            {
                history.pushState( null, null, this.root + this.clearSlashes( path ) );
            } else {
                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
            }
            return this;
        },
        /**
         * Default route
         * @param route
         * @returns {app.router}
         */
        default: function( route )
        {
            this.root = route;

            return this;
        }
    };
    /**
     *
     * @param options
     * @private
     */
    var _renderComponent = function ( options )
    {
        var _options = options || {};

        _routerOptions.appNodeRoot.innerHTML = '';
        _routerOptions.appNodeRoot.appendChild( _options.component );
    };


}( R || {} ));
(function ( app, undefined ){'use strict';
    /**
     *
     * @type {string[]}
     * @private
     */

    var _languages = ['fr','en'], Loader,
        favicon;

    /**
     * Log
     * @param message
     */
    app.utils.log = function ( message )
    {
        console.error(
            message
        );
        console.warn(
            "-------------------------------------------\n"
            +" R.js Javascript Library. Version: " +app.version
        );
    };

    /**
     * Format Multimedia Time
     * @param time
     * @returns {*}
     */
    app.utils.formatTime = function ( time )
    {
        var currentTime = time ? time : 0;

        if( currentTime === 0 )
        {
            return '';
        }else{

            if( Math.floor(time) < 3600)
            {
                var minutes = Math.floor( parseInt( currentTime / 60, 10 ) ),
                    seconds  = Math.floor( currentTime % 60 );

                return   ( minutes < 10 ? '0' + minutes : minutes ) + ':' +
                    ( seconds < 10 ? '0' + seconds : seconds );
            }else{

                var __totalSeconds = new Date(null);

                __totalSeconds.setSeconds(time);

                return __totalSeconds.toISOString().substr(11,8);
            }


        }
    };
    /**
     *
     * @param dateFromDB
     * @returns {Date}
     */
    app.utils.convertDateFromGMT = function( dateFromDB )
    {
        return new Date(dateFromDB + ' UTC');
    };
    /**
     *  Parse JSON
     * @param data
     */
    app.utils.parseJSON = function ( data )
    {
        try{
            if( typeof data == "string" )
            {
                return JSON.parse( data );
            }else{
                return {};
            }
        } catch ( error  ){

            this.log( error );
        }
    };
    /**
     *  Stringify JSON
     * @param data
     */
    app.utils.stringify = function ( data )
    {
        return JSON.stringify( data );
    };

    /**
     * Detect Browser Language
     * @returns {string}
     */
    app.utils.detectUserLanguage = function ()
    {
        var userLanguage = navigator.language ||
                navigator.userLanguage ||
                navigator.browserLanguage ||
                navigator.systemLanguage,
            length = _languages.length,
            language = 'fr',
            index;

        for( index = 0; index < length; index++ )
        {
            var current = _languages[ index ];

            if( userLanguage.indexOf(current) > -1 )
            {
                language = current;
                break;
            } else{
                language = 'en';
            }
        }

        return language;
    };
    /**
     *
     * @param obj
     * @param extension
     */
    app.utils.extend = function ( obj, extension )
    {
        for( var element in extension )
        {
            if( extension.hasOwnProperty( element ))
            {
                obj[ element ] = extension [ element ];
            }
        }
    };
    /**
     * is Number
     * @param number
     * @returns {boolean}
     */
    app.utils.isNumber = function( number )
    {
        return ( typeof number === "number" );
    };
    /**
     * is String
     * @param string
     * @returns {boolean}
     */
    app.utils.isString = function ( string )
    {
        return ( typeof string === "string" );
    };
    /**
     * is Empty
     * @param string
     * @returns {boolean}
     */
    app.utils.isEmpty = function ( string )
    {
        return ( typeof string === '' );
    };
    /**
     *
     * @param array
     * @returns {boolean}
     */
    app.utils.isArray = function ( array )
    {
        return Array.isArray( array );
    };
    /**
     * iS object
     * @param element
     * @returns {boolean}
     */
    app.utils.isObject = function ( element )
    {
        return ( typeof element === "object" );
    };
    /**
     * IS Function
     * @param element
     * @returns {boolean}
     */
    app.utils.isFunction = function( element )
    {
        return ( typeof element === "function" );
    };
    /**
     * iS Null
     * @param element
     * @returns {boolean}
     */
    app.utils.isNull = function( element )
    {
        return ( typeof element === null );
    };
    /**
     *
     * @param element
     * @returns {boolean}
     */
    app.utils.isUndefined = function ( element )
    {
        return ( typeof element === "undefined" );
    };

    /**
     *@param options
     * @param options.wait {Number} Loader Duration
     * @param callback
     */
    var _showLoader = function( options, callback )
    {
        callback = callback || function(){};
        options = options || {};

        Loader.style.display = 'block';

        setTimeout( function (){

            Loader.style.display = 'none';
            callback();

        }, options.wait || 500);
    };
    /**
     * Hide Loader
     * @private
     */
    var _hideLoader = function ( timer )
    {
        setTimeout(function(){
            Loader.style.display = 'block';
        }, timer || 500 );
    };

    /**
     * Loader
     * @type {HTMLElement|*}
     */
    Loader = app.createComponent('rjs-loader',{

        render: function ()
        {
            return {
                icon: app.DOM.div({className:'rjs-loader-icon'}, null)
            };
        }
    });

    /**
     * Loader
     * @type {{show: Function, hide: Function}}
     */
    app.utils.loader = {
        show:_showLoader,
        hide: _hideLoader
    };

    app.utils.getRandomID =  function()
    {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    /**
     *
     * @param element
     * @returns {boolean}
     */
    app.utils.isInViewport  = function(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    /**
     * Request FullScreen
     * @param{HTMLElement} element
     * @param{Function} callback
     * @private
     */

    var _requestFullScreen = function ( element, callback )
    {
        var _callback = callback || function(){};

        if( element.requestFullScreen )
        {
            element.requestFullScreen();
            _callback();

        }else if( element.mozRequestFullScreen )
        {
            element.mozRequestFullScreen();
            _callback();

        }else if ( element.webkitRequestFullScreen )
        {
            element.webkitRequestFullScreen();
            _callback();
        }
    };
    /**
     * Quit FullScreen
     * @param{Function} callback
     * @private
     */
    var _cancelFullScreen = function( callback )
    {
        var _callback = callback || function(){};

        if(document.cancelFullScreen)
        {
            document.cancelFullScreen();
            _callback();

        }else if( document.mozCancelFullScreen )
        {
            document.mozCancelFullScreen();
            _callback();

        }else if ( document.webkitCancelFullScreen )
        {
            document.webkitCancelFullScreen();
            _callback();
        }
    };
    /**
     * FullScreen API
     * @type {{enter: Function, exit: Function}}
     */
    app.utils.fullscreen = {
        enter:_requestFullScreen,
        exit:_cancelFullScreen
    };
    /**
     *  Browser environment sniffing
     * @type {boolean}
     */
    var inBrowser = typeof window !== 'undefined',
        UA = inBrowser && window.navigator.userAgent.toLowerCase(),
        isIE = UA && /msie|trident/.test(UA),
        isIE9 = UA && UA.indexOf('msie 9.0') > 0,
        isEdge = UA && UA.indexOf('edge/') > 0,
        isAndroid = UA && UA.indexOf('android') > 0,
        isIOS = UA && /iphone|ipad|ipod|ios/.test(UA),
        isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
    /**
     * Detect browser environment
     * @type {{isInBrowser: boolean, isIE: (boolean|string), isIE9: (boolean|string), isEdge: (boolean|string), isAndroid: (boolean|string), isIOS: (boolean|string), isChrome: (boolean|string), isMobile: Function}}
     */
    app.utils.browser = {
        isInBrowser: inBrowser,
        isIE: isIE,
        isIE9: isIE9,
        isEdge: isEdge,
        isAndroid: isAndroid,
        isIOS: isIOS,
        isChrome: isChrome,
        isMobile: function () { return ( isAndroid || isIOS ); }
    };
    /**
     * SetTitle
     * @param {String} title
     * @return void
     */
    app.utils.browser.setTitle = function ( title )
    {
        document.title = title;
    };
    /**
     * SetFavicon
     * @param path
     */
    app.utils.browser.setFavicon = function( path )
    {
        favicon = app.DOM.findBy({custom:"[data-utilid='favicon']"});
        favicon.href = path;
    };
    /**
     * Add Favicon
     * @private
     */
    var _createFavicon = function ()
    {
        favicon = app.createElement("link",{rel:"icon",type:"img/jpg", dataUtilId:"favicon"}, null );
        document.head.appendChild( favicon );
    };
    /**
     *
     * @type {{isAllFieldsRequiredValidated: Function}}
     */
    app.utils.form = {
        isAllFieldsRequiredValidated: function ( element )
        {
            var form = document.querySelector(element );
            var len = form.length,
                isValid = false,
                index = 0;

            for( index; index < len; index++ )
            {
                isValid = form[index].validity.valid;
            }
            return isValid;
        }
    };
    /**
     *
     * @param bytes
     * @returns {*}
     */
    app.utils.byteToSize = function ( bytes )
    {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round( bytes / Math.pow(1024, i ), 2) + ' ' + sizes[i];
    };
    /**
     *
     * @returns {string}
     */
     app.utils.getRandomID = function ()
    {
        return '_' + Math.random().toString(36).substr(2, 9);
    }


    _createFavicon();

}( R || {}));
(function(app, undefined){'use strict';

    /**
     * Sound Interface
     * @author David BONDUKU
     */

    /**
     *
     * @type {{audio: Audio, seekingTime: number, queue: Array, randomQueue: Array, currentIndex: number}}
     * @private
     */
    var _options = {
            seekingTime : 5,
            queue : [],
            randomQueue: [],
            currentIndex : 0,
            mixer:{},
            audioContext:''
        },

        _repeatTrack = false,
        /**
         * Current File
         * @type {string}
         * @private
         */
        _currentFile = '';
    /**
     *
     * @type {Audio}
     */
    _options.audio = _options.audio || new Audio();


    /**
     *  Sound Events
     * @type {{queueChanged: string, start: string, paused: string, trackChanged: string, stopped: string, error: string, volumeChanged: string, seeking: string, repeat: string, waiting: string, loadeddata: string, timeupdated: string}}
     */

    app.sound.messages = {
        queueChanged: 'rjs.sound.queueChanged',
        start: 'rjs.sound.start',
        paused: 'rjs.sound.paused',
        trackChanged: 'rjs.sound.trackChanged',
        stopped: 'rjs.sound.stopped',
        error: 'rjs.sound.error',
        volumeChanged: 'rjs.sound.volumeChanged',
        seeking: 'rjs.sound.seeking',
        repeat: 'rjs.sound.repeated',
        waiting: 'rjs.sound.waiting',
        loadeddata: 'rjs.sound.loadeddata',
        timeupdated: 'rjs.sound.timeupdated'
    };


    /**
     * Is music playing
     * @type {boolean}
     */
    app.sound.isPlaying = false;
    /**
     * Is Queue Empty
     * @type {boolean}
     */
    app.sound.isQueueEmpty = true;
    /**
     *
     * @type {number}
     */
    _options.audio.volume = 0.9;
    /**
     * isSupported
     * @returns {boolean}
     */
    app.sound.isSupported = function ()
    {
        return ( _options.audio.canPlayType('mp3') == '');
    };
    /**
     *  Get Current Playing Track
     * @returns {string}
     */
    app.sound.track = function ()
    {
        return _options.queue[ _options.currentIndex ];
    };

    /**
     * Play
     * @param index
     */
    app.sound.play = function ( index )
    {
        index = index || _options.currentIndex;

        if( _setAudioSource( index ) )
        {
            if(_options.audio.paused )
            {
                _options.audio.play();
                app.emit( app.sound.messages.start, _options.queue[ _options.currentIndex ] );
                app.sound.isPlaying = true;

            }else{
                _options.audio.pause();
                app.emit( app.sound.messages.paused, _options.queue[ _options.currentIndex ] );
                app.sound.isPlaying = false;
            }
        }
    };
    /**
     *
     */
    app.sound.pause = function ()
    {
        _options.audio.pause();
        app.emit( app.sound.messages.paused, _options.queue[ _options.currentIndex ] );
        app.sound.isPlaying = false;
    };


    /**
     * Set Audio Source
     * @param currentIndex
     * @private
     * @return boolean
     */
    var _setAudioSource = function ( currentIndex )
    {
        var _isDone = false;

        if( _options.queue.length > 0 && ( typeof currentIndex === 'number' ))
        {
            try{
                if( _options.queue.length >= currentIndex  )
                {
                    var currentPath  = _options.queue[ currentIndex ].path;

                    if( _currentFile !== currentPath )
                    {
                        _options.currentIndex = currentIndex;
                        _currentFile = _options.audio.src = currentPath;
                    }
                    _isDone = true;
                }
            }catch( error ){
                app.utils.log( error );
            }
        }
        return _isDone;
    };
    /**
     * Play Next Track
     */
    app.sound.next = function ()
    {
        if( app.sound.hasNext() && !_options.audio.loop )
        {
            app.sound.play( _options.currentIndex+1 );
        }
    };

    /**
     * Previous Track
     * @return void
     */
    app.sound.previous = function ()
    {
        if( app.sound.hasPrev() && !_options.audio.loop )
        {
            app.sound.play( _options.currentIndex-1 );
        }
    };
    /**
     * Randomize
     */
    app.sound.randomize = function ()
    {
        var currentIndex = _options.queue.length,
            temporaryValue, randomIndex;

        while( 0 !== currentIndex )
        {
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            temporaryValue = _options.queue[ currentIndex ];
            _options.queue[ currentIndex ] = _options.queue[ randomIndex ];
            _options.queue[ randomIndex ] = temporaryValue;
        }
        app.emit( app.sound.messages.queueChanged, _options.queue );
    };
    /**
     *  Repeat Track or queue
     */
    app.sound.repeat = function ()
    {
        switch ( _repeatTrack )
        {
            case false:

                _repeatTrack = true;
                _options.audio.loop = true;
                app.emit( app.sound.messages.repeat, {repeat:'one'} );

                break;
            case true:

                _repeatTrack = 'all';
                app.emit( app.sound.messages.repeat, {repeat:'all'} );
                _options.audio.loop = false;

                break;
            case 'all':

                _repeatTrack = false;
                _options.audio.loop = false;
                app.emit( app.sound.messages.repeat, {repeat:'off'} );

                break;
        }
    };
    /**
     * Seek
     * @param time
     */
    app.sound.seek = function ( time )
    {
        if( isNaN( _options.audio.duration ) ) return;

        try{
            _options.audio.currentTime = _options.audio.duration * time ;
            app.emit( app.sound.messages.seeking, {currentTime: _options.audio.currentTime} );
        }
        catch ( error )
        {
            app.utils.log( error );
        }
    };
    /**
     * Fast Forward
     */
    app.sound.fastForward = function ()
    {
        _options.audio.currentTime = _options.audio.currentTime + _options.seekingTime;
    };
    /**
     * Previous Rewind
     */
    app.sound.fastRewind = function ()
    {
        _options.audio.currentTime = _options.audio.currentTime - _options.seekingTime;
    };
    /**
     * Get Volume
     * @returns {number}
     */
    app.sound.volume = function ()
    {
        return _options.audio.volume * 100;
    };
    /**
     * Set Volume
     * @param value
     */
    app.sound.setVolume = function ( value )
    {
        _options.audio.volume = ( value / 100 );
        app.emit( app.sound.messages.volumeChanged,{volume:value} );
    };
    /**
     * Audio Event
     * @param event
     * @param callback
     */
    app.sound.on = function ( event, callback )
    {
        _options.audio.addEventListener( event, function ( event ){
            callback ( _options.audio );
        },false);
    };
    /**
     * isValid Schema
     * @param data
     * @returns {boolean}
     * @private
     */
    var _isValidSchema = function ( data )
    {
        return (
            data.id !== undefined &&
            data.path !== undefined &&
            data.poster !== undefined &&
            data.artist !== undefined
        );
    };

    /**
     * Load
     * @param track
     * @param {String} track.id
     * @param {String} track.path
     * @param {String} track.poster
     * @param {String} track.artist
     */
    app.sound.load = function ( track )
    {
        track = track || {};

        if( _isValidSchema( track ) )
        {
            _options.queue.push( track );
            app.sound.isQueueEmpty = false;
            app.emit( app.sound.messages.queueChanged, _options.queue );

        }else{
            app.utils.log('id, path, artist and poster  are required !');
        }
    };
    /**
     * LoadQueue
     * @param {Array} collection
     */
    app.sound.loadQueue = function ( collection )
    {
        if( Array.isArray( collection ) )
        {
            for( var index = 0; index < collection.length; index++ )
            {
                if( _isValidSchema( collection [ index ] ) )
                {
                    _options.queue.push( collection[ index ] );
                    app.sound.isQueueEmpty = false;

                }else{

                    app.utils.log('id, path, artist and poster  are required !');
                }
            }
            app.emit( app.sound.messages.queueChanged, _options.queue );
        }
    };
    /**
     * Add To
     * @param index
     * @param track
     * @param {String} track.id
     * @param {String} track.path
     * @param {String} track.poster
     * @param {String} track.artist
     * @param {Number} track.item_id
     *
     */
    app.sound.addTo = function ( index, track )
    {
        if( _isValidSchema( track ) )
        {

            _options.queue.splice( index, 0, track );
            app.sound.isQueueEmpty = false;

        }else{

            app.utils.log('id, path, artist and poster  are required !');
        }
        app.emit( app.sound.messages.queueChanged, _options.queue );
    };

    /**
     *  Play All Queue
     * @private
     */
    var _playAllQueue = function ()
    {
        if( _isLastTrack() )
        {
            app.sound.play(0);
        }else{
            app.sound.next();
        }
    };
    /**
     * Queue track
     * @returns {string[]}
     */
    app.sound.queue = function ()
    {
        return _options.queue;
    };
    /**
     * Queue Count
     * @returns {Number}
     */
    app.sound.queueCount = function ()
    {
        return _options.queue.length;
    };
    /**
     * Clear Queue
     */
    app.sound.clearQueue = function ()
    {
        _options.queue = [];
        app.sound.isQueueEmpty = true;

        _resetPlayer();
        app.emit( app.sound.messages.queueChanged, _options.queue );

    };
    /**
     * Has Next Track
     * @returns {boolean}
     */
    app.sound.hasNext = function ()
    {
        return _isTrackExist( _options.currentIndex+1 );
    };
    /**
     * is Track Exist
     * @param {number} track
     * @returns {boolean}
     * @private
     */
    var _isTrackExist = function ( track )
    {
        return ( _options.queue[ track ] !== undefined
        && _options.queue[ track ].id !== undefined );
    };
    /**
     * ResetPlayer
     * @private
     */
    var _resetPlayer = function ()
    {
        _options.audio.src = '';
        _options.currentIndex = 0;
        _currentFile = '';
    };
    /**
     * Has Previous Track
     * @return {boolean}
     */
    app.sound.hasPrev = function ()
    {
        return ( _isTrackExist( _options.currentIndex-1 ) );
    };
    /**
     * is Last Track
     * @returns {boolean}
     * @private
     */
    var _isLastTrack = function ()
    {
        return ( _options.currentIndex === _options.queue.length-1 )
    };
    /**
     * Subscribe on ended Event
     */
    app.sound.on('ended', function(){

        switch ( _repeatTrack )
        {
            case false:
                app.emit( app.sound.messages.stopped,  _options.queue[ _options.currentIndex ] );
                app.sound.next();
                break;
            case 'all':
                _playAllQueue();
                break;
        }
    },false);
    /**
     * @description The event occurs when an error occurred during the loading of a media file
     * @param event
     */
    _options.audio.onerror = function ( event )
    {
        app.emit( app.sound.messages.error, {} );
    };
    /**
     * @description The event occurs when the media has paused but is expected to resume (like when the media pauses to buffer more data)
     */
    _options.audio.onwaiting = function ()
    {
        app.emit( app.sound.messages.waiting, {} );
    };
    /**
     * @description The event occurs when the media is playing after having been paused or stopped for buffering
     */
    _options.audio.onplaying = function ()
    {
        app.emit( app.sound.messages.loadeddata, {} );
    };
    /**
     * @description The event occurs when the playing position has changed (like when the user fast forwards to a different point in the media)
     * @param event
     */
    _options.audio.ontimeupdate = function ( event )
    {
        if( !this.paused )
             app.emit( app.sound.messages.timeupdated, {
                currentTime: this.currentTime,
                duration: this.duration,
                id: _options.queue[ _options.currentIndex ] ? _options.queue[ _options.currentIndex ].id:null
            } );
    };
    /**
     *  Current Time
     * @returns {number}
     */
    app.sound.currentTime = function ()
    {
        return ( Math.floor((100 / _options.audio.duration) * _options.audio.currentTime) );
    };
    /**
     * Buffered Time
     * @returns {number}
     */
    app.sound.bufferedTime = function ()
    {
        return ( Math.floor((100 / _options.audio.buffered.end(0)) * _options.audio.duration) );
    };
    /**
     * CurrentIndex
     * @returns {number}
     */
    app.sound.currentIndex = function ()
    {
        return _options.currentIndex;
    };
    /**
     * Set Index
     * @param index
     */
    app.sound.setIndex = function ( index )
    {
        _options.currentIndex = ( typeof index === 'number' ) ? index : 0;
    };
    /**
     * Get Audio Core
     * @returns {Audio}
     */
    app.sound.core = function ()
    {
        return _options.audio;
    };
    /**
     * Clear Queue
     * @param index
     */
    app.sound.remove = function ( index )
    {
        _options.queue.splice( index, 1 );

        if( index == 0 && _options.currentIndex == index )
        {
            _options.currentIndex = 0;
            app.sound.play();

        }else if( index < _options.currentIndex )
        {
            _options.currentIndex = _options.currentIndex-1;
        }

        app.emit( app.sound.messages.queueChanged,_options.queue );
    };

    /**
     * PlayJustAfter
     * @param track
     */
    app.sound.playJustAfter = function( track )
    {
        var _track = track || {};

        if( _isValidSchema( _track ) )
        {

            _options.queue.splice( _options.currentIndex,0, _track );
            app.emit( app.sound.messages.queueChanged,_options.queue );

        }else{
            app.utils.log('id, path, artist and poster  are required');
        }
    };

    /**
     * InitWebAudio
     * @returns {*}
     * @private
     */
    var _initWebAudioApi = function ()
    {
        return (
            window.AudioContext ||
            window.mozAudioContext ||
            window.oAudioContext ||
            window.msAudioContext
        );
    };

    /**
     * Enhance Audio
     * @private
     */
    var _enhanceAudio = function ()
    {
        _options.mixer = {
            sourceMixing:_options.audioContext.createMediaElementSource( _options.audio ),
            filter: _options.audioContext.createBiquadFilter()
        };

        _options.mixer.sourceMixing.connect( _options.mixer.filter );
        _options.mixer.filter.connect( _options.audioContext.destination );
        _options.mixer.sourceMixing.connect( _options.audioContext.destination );

        _options.mixer.filter.type = 'lowpass';
        _options.mixer.filter.frequency.value = 48;
        _options.mixer.filter.Q.value = 10;
    };
    /**
     * Audio Boost
     * @private
     */
    var _initAudioBoost = function()
    {
        var audioContext = _initWebAudioApi();

        if( audioContext )
        {
            _options.audio.oncanplay = function ()
            {
                /** _options.audioContext = new audioContext();
                 _enhanceAudio();**/
            };
            //_options.audio.crossOrigin = 'anonymous';
        }
    };


    /**
     *
     * @param path
     * @param name
     * @constructor
     */
    function Sound(path, name)
    {
        this._file_path = path;
        this._file_name = name;
        this._current_file = '';
        this._current_index = 0;
        this._collection = [];
        this._audio = new Audio;

        this.id = getRandomID();
    }

    Sound.prototype = {

        play: function()
        {

        },

        next: function()
        {

        },


        prev: function()
        {

        },

        delete: function()
        {
            this._collection.splice(this._current_index,1);
            app.emit( app.sound.messages.queueChanged, { model:this._collection, id: this.id} );

        },
        load: function( collection )
        {
            var _that = this;

            if( Array.isArray( collection ) )
            {
                collection.map(function( item ){
                    _that._collection.push( item );
                });

                app.emit( app.sound.messages.queueChanged, { model:_that._collection, id: _that.id} );

            }else{
                _that._collection.push( collection );
                app.emit( app.sound.messages.queueChanged, { model:_that._collection, id: _that.id} );
            }
        }
    };

    /**
     *
     * @returns {string}
     */
    function getRandomID()
    {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * AudioBoost
     */
    _initAudioBoost();


}(R || {}));
(function( app, undefined ) { 'use strict';
    /**
     * VideoQueue Service
     */
    app.services.add('VideoQueue', function ( context ) {

        var _queue = [],
            _event =  {
                queueChanged: 'rjs.video.queueChanged'
            },
            /**
             * Add
             * @param queue
             * @private
             */
            _add = function ( queue )
            {
                if( Array.isArray( queue ))
                {
                    _addCollectionOfMovies( queue );

                }else{
                    _addMovie ( queue );
                }
            };
        /**
         *
         * @param queue
         * @private
         */
        function _addCollectionOfMovies ( queue )
        {
            queue.map(function( element ) {

                if( _isValidSchema( element ) )
                {
                    _queue.push( element );

                }else{
                    app.utils.log('id, poster and path are required !');
                }
            });
            _emitChange();
        }

        /**
         * EmitChange
         */
        function _emitChange ()
        {
            app.emit( _event.queueChanged, _queue );
        }

        /**
         *
         * @param queue
         * @private
         */
        function _addMovie ( queue )
        {
            if( _isValidSchema( queue ))
            {
                _queue.push( queue );
                _emitChange();
            }else{
                app.utils.log('id, poster and path are required !');
            }
        }

        /**
         * Remove
         * @param movieId
         * @private
         */
        function _remove ( movieId )
        {
            if( app.utils.isNumber( movieId ) )
            {
                _queue.splice( movieId, 1 );

                _emitChange();
            }
        }

        /**
         *
         * @returns {Array}
         * @private
         */
        function _getAll ()
        {
            return _queue;
        }

        /**
         *
         * @returns {Number}
         * @private
         */
        function _getCount ()
        {
            return _queue.length;
        }

        /**
         * Clear All
         * @private
         */
        function _clearAll ()
        {
            _queue = [];
            app.emit( _event.queueChanged, {} );
        }

        /**
         *
         * @param index
         * @returns {*}
         * @private
         */
        function _get ( index )
        {
            if( app.utils.isNumber( index ) )
            {
                return _queue[ index ] ? _queue[ index ] : null;
            }else{
                app.utils.log( 'Number required !!!' );
            }
        }

        /**
         * Is Valid Schema
         * @param queue
         * @returns {boolean}
         * @private
         */
        function _isValidSchema ( queue )
        {
            return ( queue.id !== undefined &&
            queue.poster !== undefined &&
            queue.path !== undefined );
        }

        /**
         *
         * @param callback
         * @private
         */
        function _onChange ( callback )
        {
            app.on(_event.queueChanged, function ( data ) {
                callback ( data );
            } )
        }

        /*****
         *  PUBLIC API
         */
        return {
            add: _add,
            removeAt: _remove,
            clearQueue: _clearAll,
            count: _getCount,
            all: _getAll,
            getAt: _get,
            listen : _onChange
        };
    });

}( R || {} ));
(function( app, undefined ){'use strict';

    /**
     * Video Interface
     */
    var _options = {
            video: app.createElement('video',{className:'rjs-video-player'},null),
            seekingTime : 5,
            queue : [],
            randomQueue: [],
            currentIndex : 0,
            root: document.body,
            upVolume: 10
        },
        VideoQueue = app.services.get( 'VideoQueue' );

    /**
     *  Video Events
     * @type {{queueChanged: string, start: string, paused: string, trackChanged: string, stopped: string, error: string, volumeChanged: string, seeking: string, repeat: string, waiting: string, loadeddata: string, sharing: string, timeupdate: string, errorOldBrowser: string}}
     */
    app.video.messages = {
        queueChanged:'rjs.video.queueChanged',
        start:'rjs.video.start',
        paused:'rjs.video.paused',
        trackChanged:'rjs.video.trackChanged',
        stopped:'rjs.video.stopped',
        error:'rjs.video.error',
        volumeChanged:'rjs.video.volumeChanged',
        seeking:'rjs.video.seeking',
        repeat:'rjs.video.repeated',
        waiting:'rjs.video.waiting',
        loadeddata:'rjs.video.loadeddata',
        sharing: 'rjs.video.sharing',
        timeupdate: 'rjs.video.timeupdate',
        errorOldBrowser:'rjs.video.error.oldbrowser'
    };

    /**
     *
     * @type {boolean}
     */
    _options.video.controls = false;

    /**
     *
     * @type {boolean}
     */
    _options.video.autoplay = false;

    /**
     * Preload
     * @type {boolean}
     */
    _options.video.preload = 'auto';
    /**
     *
     * @type {number}
     */
    _options.video.volume = 0.6;

    /**
     *
     * @type {number}
     */
    _options.upVolume = _options.video.volume * 100;

    /**
     *  Repeat Video
     * @type {boolean}
     * @private
     */
    var _repeatVideo = false;
    /**
     * Current FIle
     * @type {string}
     * @private
     */
    var _currentFile = '';

    /**
     * Is video playing
     * @type {boolean}
     */
    app.video.isPlaying = false;
    /**
     * Is Queue Empty
     * @type {boolean}
     */
    app.video.isQueueEmpty = true;

    /**
     * @type {boolean}
     */
    app.video.INITIALIZED = false;

    /**
     * isSupported
     * @returns {boolean}
     */
    app.video.isSupported = function ()
    {
        return ( _options.video.canPlayType("video/mp4") !== '');
    };
    /**
     *  Get Current Playing Track
     * @returns {object}
     */
    app.video.track = function ()
    {
        return _options.queue[ _options.currentIndex ];
    };

    /**
     * Play
     * @param {number} track
     */
    app.video.play = function ( track )
    {
        track = track || _options.currentIndex;

        if( _setVideoSource( track ) )
        {
            setTimeout( function (){
                _playTrack();
            },100);
        }
    };
    /**
     *
     * @param {number} index
     */
    app.video.setIndex = function ( index )
    {
        _options.currentIndex = index || 0;
    };

    /**
     * Play Track
     * @private
     */
    var _playTrack = function ()
    {
        if( _options.video.paused )
        {
            _options.video.play();
            app.video.isPlaying = true;
            app.emit( app.video.messages.start, { movie :_options.queue[ _options.currentIndex ] } );

        }else{

            _options.video.pause();
            app.video.isPlaying = false;
            app.emit( app.video.messages.paused, { movie :_options.queue[ _options.currentIndex ] }  );
        }
    };

    /**
     * Set Video Source
     * @param currentIndex
     * @private
     * @return boolean
     */
    var _setVideoSource = function ( currentIndex )
    {
        var _isDone = false;

        if(  _options.queue.length > 0 &&
            ( typeof currentIndex === 'number' ) &&
            app.video.isSupported()
        )
        {
            try{
                if( _options.queue.length >= currentIndex  )
                {
                    var currentPath  = _options.queue[ currentIndex ].path;

                    if(_currentFile !== currentPath )
                    {
                        _options.currentIndex = currentIndex;
                        _currentFile = _options.video.src = currentPath;
                    }

                    _isDone = true;
                }
            }catch( error ){
                app.utils.log( error );
            }
        }
        return _isDone;
    };

    /**
     * Play Next Track
     */
    app.video.next = function ()
    {
        if( app.video.hasNext() && !_options.video.loop )
        {
            app.video.play( _options.currentIndex+1 );
        }
    };

    /**
     * Previous Track
     * @return void
     */
    app.video.previous = function ()
    {
        if( app.video.hasPrev() && !_options.video.loop )
        {
            _options.currentIndex--;
            app.video.play();
        }
    };
    /**
     * Randomize
     */
    app.video.randomize = function ()
    {
        var currentIndex = _options.queue.length,
            temporaryValue, randomIndex;

        while( 0 !== currentIndex )
        {
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            temporaryValue = _options.queue[ currentIndex ];
            _options.queue[ currentIndex ] = _options.queue[ randomIndex ];
            _options.queue[ randomIndex ] = temporaryValue;
        }
    };

    /**
     *  Repeat Track or queue
     */
    app.video.repeat = function ()
    {
        switch ( _repeatVideo )
        {
            case false:

                _repeatVideo = true;
                _options.video.loop = true;
                app.emit( app.video.messages.repeat, {repeat:'one'});

                break;
            case true:

                _repeatVideo = 'all';
                app.emit( app.video.messages.repeat, {repeat:'all'});
                _options.video.loop = false;

                break;
            case 'all':

                _repeatVideo = false;
                _options.video.loop = false;
                app.emit( app.video.messages.repeat, {repeat:'off'});

                break;
        }
    };
    /**
     * Seek
     * @param time
     */
    app.video.seek = function ( time )
    {
        try{
            _options.video.currentTime = _options.video.duration * time ;

            app.emit( app.video.messages.seeking, {time: _options.video.currentTime});

        }catch( error ){
            app.utils.log( error );
        }
    };
    /**
     * Fast Forward
     */
    app.video.fastForward = function ()
    {
        _options.video.currentTime = _options.video.currentTime + _options.seekingTime;
        app.emit( app.video.messages.seeking, {time: _options.video.currentTime} );
    };
    /**
     * Previous Rewind
     */
    app.video.fastRewind = function ()
    {
        _options.video.currentTime = _options.video.currentTime - _options.seekingTime;
        app.emit( app.video.messages.seeking, {time: _options.video.currentTime} );
    };
    /**
     * Get Volume
     * @returns {number}
     */
    app.video.volume = function ()
    {
        return _options.video.volume * 100;
    };
    /**
     * Set Volume
     * @param value
     */
    app.video.setVolume = function ( value )
    {
        if( typeof value === "number" )
        {
            _options.video.volume = ( value / 100 );
            app.emit( app.video.messages.volumeChanged, {volume:value} );
        }
    };
    /**
     * UpVolume
     */
    app.video.volumeUp = function ()
    {
        this.setVolume( _options.upVolume );

        if( _options.upVolume <= 90 )
        {
            _options.upVolume += 10;
        }
    };
    /**
     * Down Volume
     */
    app.video.volumeDown = function ()
    {
        this.setVolume( _options.upVolume );

        if( _options.upVolume > 0 )
        {
            _options.upVolume -= 10;
        }
    };

    /**
     * Audio Event
     * @param event
     * @param callback
     */
    app.video.on = function ( event, callback )
    {
        _options.video.addEventListener(event, function ( event ){
            callback ( _options.video );
        },false);
    };
    /**
     *
     * @param event
     * @param callback
     */
    app.video.onSharing = function (event, callback)
    {
        app.on( event, function( data ){
            callback( data );
        });
    };

    /**
     * LoadQueue
     * @param movie
     */
    app.video.loadQueue = function ( movie )
    {
        VideoQueue.add( movie );
        app.video.isQueueEmpty = false;
    };
    /**
     *  Play All Queue
     * @private
     */
    var _playAllQueue = function ()
    {
        if( _isLastTrack() )
        {
            app.video.play(0);
        }else{
            app.video.next();
        }
    };
    /**
     * VideoQueue Service
     */
    VideoQueue.listen( function ( data ){
        _options.queue = data;
    });

    /**
     * Queue Video
     * @returns {string[]}
     */
    app.video.queue = function ()
    {
        return _options.queue;
    };

    /**
     * Queue count
     * @returns {Number}
     */
    app.video.queueCount = function ()
    {
        return _options.queue.length;
    };
    /**
     *
     * @private
     */
    var _resetPlayer = function ()
    {
        _options.video.pause();
        _options.currentIndex = 0;
        _currentFile = '';
    };

    /**
     * Clear Queue
     */
    app.video.clearQueue = function ()
    {
        _options.queue = [];

        VideoQueue.clearQueue();
        app.video.isQueueEmpty = true;
        _resetPlayer();
    };
    /**
     * Has Next Track
     * @returns {boolean}
     */
    app.video.hasNext = function ()
    {
        return _isTrackExist( _options.currentIndex+1 );
    };
    /**
     * is Track Exist
     * @param track
     * @returns {boolean}
     * @private
     */
    var _isTrackExist = function ( track )
    {
        return ( _options.queue[ track ] !== undefined
        && _options.queue[ track ].id !== undefined );
    };
    /**
     * Has Previous Track
     * @return {boolean}
     */
    app.video.hasPrev = function ()
    {
        return ( _isTrackExist( _options.currentIndex-1 ) );
    };

    /**
     * is Last Track
     * @returns {boolean}
     * @private
     */
    var _isLastTrack = function ()
    {
        return ( _options.currentIndex === _options.queue.length-1 )
    };

    app.video.on('ended', function (){

        switch (_repeatVideo )
        {
            case false:

                app.emit( app.video.messages.stopped, {button:'play'} );
                app.video.next();

                break;
            case 'all':

                _playAllQueue();

                break;
        }
    },false);

    /**
     * Get/Set Root
     * @param root
     * @returns {*}
     */
    app.video.root = function ( root )
    {
        if( root )
        {
            _options.root = root;
        }else{
            return _options.root;
        }
    };

    /**
     *  Core Element
     * @returns {*}
     */
    app.video.core = function ()
    {
        return _options.video;
    };

    /**
     * Config
     * @param options
     */
    app.video.config = function ( options )
    {
        options = options || {};
        _options.root =  options.root || _options.root;

        return app.video;
    };

    /**
     *
     * @param event
     */
    _options.video.onerror = function ( event )
    {
        app.emit( app.video.messages.error, event );
    };

    /**
     * On Waiting Event
     */
    _options.video.onwaiting = function ()
    {
        app.emit( app.video.messages.waiting, {} );
    };

    /**
     * On Playing Event
     */
    _options.video.onplaying = function ()
    {
        app.emit( app.video.messages.loadeddata, {} );
    };

    /**
     * TimeUpdate Event
     */
    _options.video.addEventListener('timeupdate',function( event ){
        app.emit( app.video.messages.timeupdate, { time: this.currentTime } );
    });

    /**
     *  Current Time
     * @returns {number}
     */
    app.video.currentTime = function ()
    {
        return ( Math.floor( ( 100 / _options.video.duration ) * _options.video.currentTime ) );
    };

    /**
     * Buffered Time
     * @returns {number}
     */
    app.video.bufferedTime = function ()
    {
        return ( Math.floor( ( 100 / _options.video.buffered.end(0) ) * _options.video.duration ) );
    };

    /**
     * CurrentIndex
     * @returns {number}
     */
    app.video.currentIndex = function ()
    {
        return _options.currentIndex;
    };


}(R || {}));
(function ( app, undefined ){'use strict';

    var _caches = [], CACHE = 'rjs-cache', _currentCacheName;

    app.cache.messages = {
        update: 'rjs.cache.updated',
        remove: 'rjs.cache.removed',
        create: 'rjs.cache.created',
        add: 'rjs.cache.add'
    };

    /**
     *
     * @private
     */
    function _initCache ()
    {
        if( _isCapable() )
        {
            if( _getCaches()  == null   )
            {
                _updateCache({emitChange:app.cache.messages.add});
            }
        }
    }

    /**
     *
     * @returns {boolean}
     * @private
     */
    function _isCapable ()
    {
        return ( typeof localStorage == "object" );
    }

    /**
     *
     * @param data
     * @private
     */
    function _add ( data )
    {
        _update( data );
        _updateCache({emitChange: app.cache.messages.update});
    }

    /**
     *
     * @param data
     * @private
     */
    function _update ( data )
    {
        if (Array.isArray( data ))
        {
            data.forEach( function ( item )
            {
                _caches.forEach( function ( cache ){
                    if( cache._name == _currentCacheName )
                    {
                        cache._data.push( item );
                    }
                });
            });
        }
    }

    /**
     *
     * @private
     */
    function _updateCache ( options )
    {
        localStorage.setItem( CACHE, JSON.stringify ( _caches ));

        _caches = _getCaches();

        app.emit( options.emitChange, {} );
    }

    /**
     *
     * @param cacheName
     * @param callback
     * @private
     */
    function _open( cacheName, callback )
    {
        _currentCacheName = cacheName;

        if( !_hasCache( cacheName ) )
        {
            _caches.push({_name:cacheName, _data:[]});
        }

        if( typeof callback === "function" )
        {
            setTimeout( function (){
                callback ( app.cache );
            }, 0);
        }

        _updateCache({ emitChange: app.cache.messages.create });
    }

    /**
     *
     * @param cacheName
     * @returns {boolean}
     * @private
     */
    function _hasCache( cacheName )
    {
        var hasCache = false, caches;

        caches = _getCaches();

        if( caches !== null )
        {
            caches.forEach( function ( item ){

                hasCache = ( item._name === cacheName );
            });
        }

        return hasCache;
    }

    /**
     * Get Cache
     * @private
     */
    function _getCaches ()
    {
        return app.utils.parseJSON( localStorage.getItem( CACHE ) );
    }

    /**
     * Get All Data
     * @returns {string}
     * @private
     */
    function _getAll ()
    {
        return  _getFromCacheName();
    }

    /**
     *
     * @returns {string}
     * @private
     */
    function _getFromCacheName ()
    {
        var caches = _getCaches(), data = '';

        if( caches !== null )
        {
            caches.forEach( function ( cached ){

                if( cached._name === _currentCacheName )
                {
                    data = cached._data;
                }
            });
        }

        return data;
    }

    /**
     *
     * @type {_open}
     */
    app.cache.open = _open;

    /**
     *
     * @type {_hasCache}
     */
    app.cache.has = _hasCache;

    /**
     *
     * @type {_initCache}
     */
    app.cache.add = _initCache;

    /**
     *
     * @type {_add}
     */
    app.cache.put = _add;


    app.cache.getAll = _getAll;


    _initCache();

}( R || {}));
(function ( app, undefined ) {'use strict';
    /**
     * Video UI
     * @author David BONDUKU
     * @version 1.0 alpha
     */

    var _options = {
            buttons:{
                queue: {
                    icon: '&#9776;',
                    close: '&#10006;'
                },
                volume:'&#128266;'
            },
            messages:{
                queue:{
                    hidden:'queue.video.hidden',
                    visible: 'queue.video.visible'
                },
                elements:{
                    show:'ui.show.elements',
                    hidden:'ui.hide.elements'
                },
                fullscreen:{
                    activated:'fullscreen.activated',
                    disabled:'fullscreen.disabled'
                },
                sharing:{
                    show: 'ui.show.sharing',
                    hidden: 'ui.hide.sharing'
                }
            },
            errorMessage:{
                fr:{
                    text:"Erreur pendant la lecture de la video, merci de réessayer !"
                },
                en:{
                    text:"Error while playing video, please retry !"
                },
                browserNotSupported:{
                    fr:{
                        text:"Votre navigateur n'est pas supporté, merci de le mettre à jour !"
                    },
                    en:{
                        text:'Your Browser is not supported, please update !'
                    }
                }
            },
            icon:''
        },
        _component = app.createComponent,

        _messages = [
            app.video.messages.start,
            app.video.messages.paused,
            app.video.messages.trackChanged,
            app.video.messages.error,
            app.video.messages.stopped,
            app.video.messages.volumeChanged,
            app.video.messages.seeking,
            app.video.messages.queueChanged,
            app.video.messages.waiting,
            app.video.messages.loadeddata,
            app.video.messages.sharing,
            app.video.messages.timeupdate,
            _options.messages.queue.visible,
            _options.messages.queue.hidden,
            _options.messages.fullscreen.activated,
            _options.messages.fullscreen.disabled,
            _options.messages.elements.show,
            _options.messages.elements.hidden,
            _options.messages.sharing.show,
            _options.messages.sharing.hidden
        ],
        _messagePosterSeeking = 'app.ui.poster.seeking',
        _messagePosterSeekingHide = 'app.ui.poster.seeking.hide',

        _CurrentTimeSeekComponent,
        _ButtonsComponent,
        _ProgressBuffered,
        _Progress,
        _TimeComponent,
        _VolumeComponent,
        _VolumeQueueContainer,
        _QueueComponent,
        _CommandsComponent,
        _ErrorComponent,
        _SharingElements,
        _SharingComponent,
        _videoComponent,
        _isFullScreenEnabled = false,
        _isPlayingStarted = false,
        _errorMessage,
        _isQueueRendered = false,
        _VideoTitleComponent,
        _userLanguage = app.utils.detectUserLanguage(),

        /**
         * DOM
         * @type {{}}
         */
        _dom = app.DOM;
    /**
     * Error Message
     * @type {{errorPlaying: (string|string|string|string|Function|string), oldBrowser: (string|string|string|string|Function|string)}}
     * @private
     */
    _errorMessage = {
        errorPlaying : _options.errorMessage[ _userLanguage ].text,
        oldBrowser : _options.errorMessage.browserNotSupported[ _userLanguage ].text
    };
    /**
     * CurrentTime Seek Component
     */
    _CurrentTimeSeekComponent = _component('rjs-video-poster-container',{

        messages: [
            _messagePosterSeeking,
            _messagePosterSeekingHide,
            _options.messages.elements.hidden
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case _messagePosterSeeking:

                    element.currentTime.parentNode.style.display = 'block';
                    element.currentTime.textContent = app.utils.formatTime( data.time );

                    break;

                case _messagePosterSeekingHide:

                    element.currentTime.parentNode.style.display = 'none';

                    break;

                case _options.messages.elements.hidden:

                    element.currentTime.textContent = '';


                    element.currentTime.parentNode.style.display = 'none';


                    break;
            }
        },

        render: function ()
        {
            return {
                currentTime: _dom.p({className:'rjs-video-poster-currentTime'},null)
            }
        }
    });


    /**
     * Buttons Component
     */

    _ButtonsComponent = _component('rjs-video-command-buttons',{

        fastRewind: function ()
        {
            app.video.fastRewind();
        },

        play: function ()
        {
            app.video.play();
        },

        fastForward: function ()
        {
            app.video.fastForward();
        },

        messages: [
            app.video.messages.start,
            app.video.messages.paused,
            app.video.messages.error,
            app.video.messages.stopped
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.start:

                    element.play.className = 'rjs-video-command-buttons-video rjs-video-playing';
                    _isPlayingStarted = true;
                    app.emit( _options.messages.elements.show, {} );

                    break;

                case app.video.messages.paused:

                    element.play.className = 'rjs-video-command-buttons-video rjs-video-paused';
                    _isPlayingStarted = true;
                    app.emit( _options.messages.elements.show, {} );

                    break;

                case  app.video.messages.error :
                    element.play.className = 'rjs-video-command-buttons-video rjs-video-paused';
                    _isPlayingStarted = false;

                    break;

                case app.video.messages.stopped:

                    element.play.className = 'rjs-video-command-buttons-video rjs-video-paused';
                    _isPlayingStarted = false;

                    break;
            }
        },

        render: function ()
        {
            return {
                fastRewind: _dom.div({className:'rjs-video-command-buttons-fastRewind', onclick: this.fastRewind }, null),
                play: _dom.div({className:'rjs-video-command-buttons-video rjs-video-paused', onclick: this.play }, null),
                fastForward: _dom.div({className:'rjs-video-command-buttons-fastForward', onclick: this.fastForward }, null )
            }
        }
    });

    /**
     * ProgressBuffer Component
     */
    _ProgressBuffered = _component('rjs-video-progress-buffered',{

        onmousemove: function ()
        {
            this.lastChild.style.opacity = '1';
        },

        onmouseleave: function ()
        {
            this.lastChild.style.opacity = '0';
        },

        messages: [
            app.video.messages.timeupdate,
            app.video.messages.error
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.timeupdate :

                    if( app.video.INITIALIZED )
                    {
                        element.progress.style.width = app.video.currentTime() + '%';
                        element.cursor.style.left = app.video.currentTime() + '%';
                    }

                    break;

                case app.video.messages.error:

                    element.progress.style.width = 0;
                    element.cursor.style.left = 0;

                    break;
            }
        },

        render : function ()
        {
            return {
                progress: _dom.div({className:'rjs-video-progress'},null),
                cursor: _dom.div({className:'rjs-video-progress-design'},null)
            };
        }
    });

    /**
     * Progress Component
     */
    _Progress = _component('rjs-video-progress-container',{

        seek : function ( event )
        {
            app.video.seek( event.offsetX / this.clientWidth );
        },

        onmousemove: function ( event )
        {
            if( _isPlayingStarted )
            {
                var time = ( event.offsetX / this.clientWidth ) * app.video.core().duration;
                this.emit( _messagePosterSeeking, { time:time } );

                this.style.height = '10px';

                if( app.utils.browser.isMobile())
                {
                    this.seek( event );
                }
            }
        },

        onmouseout: function ( event )
        {
            if( _isPlayingStarted )
            {
                this.emit( _messagePosterSeekingHide, {} );
                this.style.height = '10px';
            }
        },

        onclick: function ( event )
        {
            this.seek( event );
        },

        onmouseup: function ( event )
        {
            this.seek( event );
        },


        render: function ()
        {
            return {
                buffered: _ProgressBuffered
            };
        }
    });

    /**
     * Time Component
     */

    _TimeComponent = _component('rjs-video-time-container',{

        messages: [
            app.video.messages.timeupdate
        ],

        onmessage : function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.timeupdate:

                    if( app.video.INITIALIZED )
                    {
                        element.currentTime.textContent = app.utils.formatTime( app.video.core().currentTime )+ '';
                        element.duration.textContent = ' / '+ app.utils.formatTime( app.video.core().duration );
                    }

                    break;
            }
        },

        render: function ()
        {
            return {
                currentTime : _dom.p({className:'rjs-video-command-time-current'}, '--:'),
                duration : _dom.p({className:'rjs-video-command-time-duration'}, '--')
            };
        }
    });
    /**
     * Volume Component
     */
    _VolumeComponent = _component('rjs-video-command-volume',{

        changeVolume: function ( event )
        {
            var _volumeValue = ( event.offsetX / this.clientWidth )*100;
            app.video.setVolume( _volumeValue );
        },

        onclick : function ( event )
        {
            this.changeVolume( event );
        },

        onmouseup: function ( event )
        {
            this.changeVolume( event );
        },

        messages : [
            app.video.messages.volumeChanged
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.volumeChanged :

                    element.level.style.width = data.volume +'%';
                    element.cursor.style.left = data.volume +'%';

                    break;
            }
        },

        render : function ()
        {
            return {
                level : _dom.div({className:'rjs-video-command-volume-level'},null),
                cursor: _dom.div({className:'rjs-video-command-volume-design'},null)
            };
        }
    });

    /**
     * VolumeQueue Component
     */
    _VolumeQueueContainer = _component('rjs-video-command-queue-volume',{

        showQueue: function ()
        {
            app.emit( _options.messages.queue.visible, {queue: app.video.queue()} );
            return false;
        },

        messages: [
            app.video.messages.queueChanged
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.queueChanged:

                    if( app.video.queueCount() > 1 )
                    {
                        element.queueIcon.style.display = 'inline';
                    }else{
                        element.queueIcon.style.display = 'none';
                    }

                    break;
            }
        },

        render : function ()
        {
            var queueIcon  = _dom.a({className:'rjs-video-queue-icon-list', href:'#', onclick: this.showQueue }, null);
            queueIcon.innerHTML = _options.buttons.queue.icon;

            return {
                volume: _VolumeComponent,
                queueIcon: queueIcon
            }
        }
    });
    /**
     * QueueComponent
     */

    _QueueComponent = _component('rjs-video-queue',{

        closeQueue: function ()
        {
            app.emit( _options.messages.queue.hidden, {} );
            return false;
        },

        messages: [

            app.video.messages.queueChanged,
            app.video.messages.start,
            _options.messages.queue.visible,
            _options.messages.queue.hidden

        ],

        onmessage: function ( name, data , element )
        {
            switch ( name )
            {
                case app.video.messages.queueChanged:

                    if( app.video.INITIALIZED )
                    {
                        updateQueueItem( data );
                    }

                    break;

                case app.video.messages.start:

                    element.list.parentNode.style.right = '-328px';

                    break;

                case _options.messages.queue.visible:

                    element.list.parentNode.style.right = '0';
                    updateQueueItem( data.queue );
                    _isQueueRendered = true;

                    break;

                case _options.messages.queue.hidden:

                    element.list.parentNode.style.right = '-328px';

                    _isQueueRendered = false;

                    break;
            }
        },

        render: function ()
        {
            var closeIcon  = _dom.a({className:'rjs-video-queue-icon-close',href:'#', onclick: this.closeQueue }, null);
            closeIcon.innerHTML = _options.buttons.queue.close;

            return {
                iconClose: closeIcon,
                list: _dom.div({className:'rjs-video-queue-list'},null)
            };
        }
    });


    /**
     * Create Video Command Component
     */
    _CommandsComponent = _component('rjs-video-command-main',{

        messages:[

            _options.messages.elements.show,
            _options.messages.elements.hidden
        ],

        onmessage : function (name, data, element)
        {
            switch ( name )
            {
                case _options.messages.elements.show:

                    element.buttons.parentNode.style.opacity = '1';

                    break;

                case _options.messages.elements.hidden:

                    element.buttons.parentNode.style.opacity = '0';

                    break;

                default :
                    break;
            }
        },

        render: function()
        {
            return {
                buttons: _ButtonsComponent,
                progress: _Progress,
                time: _TimeComponent,
                volume: _VolumeQueueContainer
            };
        }
    });


    /**
     *
     * @param fragment
     * @param item
     * @param data
     * @param key
     * @private
     */
    var _queueItem = function (fragment, item, data, key)
    {

        var ListItem = _component('rjs-video-queue-list-item',{

            dataVideoIndex: key,

            onclick :function ()
            {
                app.video.setIndex( parseInt( this.dataset.videoindex ) );
                app.video.play();
            },

            render : function ()
            {
                var poster = _dom.div({className:'rjs-video-queue-list-item-pic'},null);
                poster.style.backgroundImage = 'url('+data[ item ].poster+')';

                return {
                    img : poster,
                    title: _dom.p({className:'rjs-video-queue-list-item-title'}, data[ item ].id || '')
                }
            }

        });

        fragment.appendChild( ListItem );
    };
    /**
     *
     * @param data
     */
    var updateQueueItem = function ( data )
    {
        var _queueList = _QueueComponent.lastChild,
            _fragment = document.createDocumentFragment(),
            _key = 0;

        _queueList.innerHTML = '';

        for( var item in data )
        {
            if( data.hasOwnProperty( item ))
            {
                _queueItem( _fragment, item, data, _key );
            }
            _key++;
        }
        _queueList.appendChild( _fragment );

    };

    /**
     * Error Component
     */
    _ErrorComponent = _component('rjs-video-error',{

        closeError: function ()
        {
            this.parentNode.style.display = 'none';

            return false;
        },

        messages: [
            app.video.messages.error,
            app.video.messages.errorOldBrowser
        ],

        onmessage: function ( name, data, element )
        {

            switch ( name )
            {
                case app.video.messages.error:

                    element.icon.parentNode.style.display = 'block';
                    element.message.textContent = _errorMessage.errorPlaying;

                    break;

                case app.video.messages.errorOldBrowser:

                    element.icon.parentNode.style.display = 'block';
                    element.message.textContent = _errorMessage.oldBrowser;

                    break;
            }
        },

        render: function ()
        {
            var close = _dom.a({ className:'rjs-video-error-close', href:'#', onclick: this.closeError }, null );
            close.innerHTML = _options.buttons.queue.close;

            return {
                close: close,
                icon: _dom.div({className:'rjs-video-error-icon'}, null),
                message: app.createElement('h1',{ className:'rjs-video-error-message'}, null )
            };
        }

    });
    /**
     * Sharing Elements Component
     */
    _SharingElements = _component('rjs-video-sharing-container',{

        share : function ()
        {
            app.emit( app.video.messages.sharing, { platform:this.dataset.name } );
        },

        messages: [
            app.video.messages.sharing
        ],

        onmessage : function ( name, data, element )
        {
            switch ( name )
            {
                case app.video.messages.sharing:

                    app.emit( _options.messages.sharing.hidden, {} );

                    break;
            }
        },

        render: function ()
        {
            return {
                facebookIcon: _dom.div({className:'rjs-sharing-facebook', onclick: this.share, dataName:'facebook' }, null),
                twitterIcon: _dom.div({className:'rjs-sharing-twitter', onclick: this.share, dataName:'twitter'}, null),
                googlePlus: _dom.div({className:'rjs-sharing-google-plus', onclick: this.share, dataName:'googlePlus' }, null)
            }
        }
    });

    /**
     * Sharing Component
     */

    _SharingComponent = _component('rjs-video-sharing',{

        closeSharing: function ()
        {
            app.emit( _options.messages.sharing.hidden, {} );
            return false;
        },

        messages: [
            _options.messages.sharing.show,
            _options.messages.sharing.hidden
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case _options.messages.sharing.show:

                    element.elements.parentNode.style.display = 'block';

                    if( app.video.isPlaying )
                    {
                        app.video.play();
                    }

                    break;

                case _options.messages.sharing.hidden:

                    element.elements.parentNode.style.display = 'none';

                    if( app.video.core().paused )
                    {
                        app.video.play();
                    }

                    break;

            }
        },

        render: function ()
        {
            var close = _dom.a({className:'rjs-video-sharing-close', href:'#', onclick: this.closeSharing }, null);
            close.innerHTML = _options.buttons.queue.close;

            return {
                close: close,
                elements: _SharingElements,
                appName: _dom.span({className:'rjs-video-app-name'},'Rouah Video Player. Version '+app.version)
            };
        }
    });

    _VideoTitleComponent = _component('rjs-video-main-title',{

        messages:[
            _options.messages.fullscreen.activated,
            _options.messages.fullscreen.disabled,
            _options.messages.elements.show,
            _options.messages.elements.hidden,
            app.video.messages.start,
            app.video.messages.error
        ],

        onmessage: function (name, data, element )
        {
            switch ( name )
            {

                case _options.messages.fullscreen.activated:

                    element.title.parentNode.style.opacity = 1;

                    break;

                case _options.messages.fullscreen.disabled:

                    element.title.parentNode.style.opacity = 0;

                    break;

                case _options.messages.elements.show:

                    if( _isFullScreenEnabled )
                    {
                        element.title.parentNode.style.opacity = 1;
                    }

                    break;

                case _options.messages.elements.hidden:

                    if( _isFullScreenEnabled )
                    {
                        element.title.parentNode.style.opacity = 0;
                    }

                    break;

                case app.video.messages.start:

                    element.title.innerHTML = data.movie.id;

                    break;

                case app.video.messages.error:

                    if( _isFullScreenEnabled )
                    {
                        element.title.parentNode.style.opacity = 0;
                    }

                    break;
            }
        },

        render: function ()
        {
            return {
                title: app.createElement("h2",{}, null)
            }
        }
    });

    /**
     * Video Component
     */

    _videoComponent = _component('rjs-video-main',{

        oncontextmenu: function ( event ) { event.preventDefault(); },

        onmousemove: function () { this.emit( _options.messages.elements.show, {} ); },

        showSharing: function () { app.emit( _options.messages.sharing.show, {} ); },

        enterFullScreen: function () { _requestFullScreen(); },

        exitFullScreen: function () { _cancelFullScreen(); },

        didMount: function ()
        {
            var that = this;
            setInterval(function(){

                that.emit(  _options.messages.elements.hidden, {} );

            },10000);
        },

        messages: _messages,

        onmessage : onMessageVideo,

        render: function ()
        {
            var video = app.video.core(),
                that = this;

            video.onclick = function ()
            {

                setTimeout(function(){
                    app.video.play();
                },50);

            };

            video.ondblclick = function ()
            {
                if( _isFullScreenEnabled )
                {
                    that.exitFullScreen();
                }else{
                    that.enterFullScreen();
                }
            };

            return {
                video: video,
                command: _CommandsComponent,
                queue: _QueueComponent,
                enterFullScreenIcon: _dom.span({className:'rjs-video-enter-fullscreen', onclick: this.enterFullScreen }, null),
                quitFullScreenIcon: _dom.span({className:'rjs-video-quit-fullscreen', onclick: this.exitFullScreen }, null),
                title: _VideoTitleComponent,
                sharingIcon: _dom.span({className:'rjs-video-sharing-icon', onclick: this.showSharing }, null),
                sharing: _SharingComponent,
                error: _ErrorComponent,
                loadingIcon: _dom.div({className:'rjs-video-loading'}, null),
                currentTime:_CurrentTimeSeekComponent
            };
        }
    });

    /**
     * Video Subscribe Messages
     * @param name
     * @param data
     * @param element
     */
    function onMessageVideo( name, data, element )
    {
        switch ( name )
        {
            case app.video.messages.error :

                element.loadingIcon.className = 'rjs-video-loading rjs-hidden';

                break;

            case _options.messages.elements.show :

                element.sharingIcon.style.opacity = '1';
                element.enterFullScreenIcon.style.opacity = '1';
                element.quitFullScreenIcon.style.opacity = '1';

                element.enterFullScreenIcon.parentNode.style.cursor = 'default';

                break;

            case _options.messages.elements.hidden :

                element.sharingIcon.style.opacity = '0';
                element.enterFullScreenIcon.style.opacity = '0';
                element.quitFullScreenIcon.style.opacity = '0';

                element.enterFullScreenIcon.parentNode.style.cursor = 'none';

                break;

            case app.video.messages.start :

                setTimeout(function(){
                    element.sharingIcon.style.display = 'block';
                },160);

                break;

            case _options.messages.queue.visible :

                element.sharingIcon.style.display = 'none';

                break;

            case _options.messages.queue.hidden :

                setTimeout(function(){
                    element.sharingIcon.style.display = 'block';
                },160);

                break;

            case app.video.messages.waiting :

                element.loadingIcon.className = 'rjs-video-loading rjs-show';

                break;

            case app.video.messages.loadeddata :

                element.loadingIcon.className = 'rjs-video-loading rjs-hidden';

                break;

            case app.video.messages.queueChanged :

                element.loadingIcon.className = 'rjs-video-loading rjs-show';

                setTimeout( function (){

                    element.loadingIcon.className = 'rjs-video-loading rjs-hidden';

                }, 600);

                break;

            case _options.messages.fullscreen.activated :

                element.enterFullScreenIcon.style.display = 'none';
                element.quitFullScreenIcon.style.display = 'block';
                element.quitFullScreenIcon.style.opacity = '1';

                _isFullScreenEnabled = true;

                break;

            case _options.messages.fullscreen.disabled :

                element.enterFullScreenIcon.style.display = 'block';
                element.quitFullScreenIcon.style.display = 'none';

                _isFullScreenEnabled = false;

                break;
        }
    }

    /**
     * Enter FullScreen
     * @private
     */
    function _requestFullScreen ()
    {
        app.utils.fullscreen.enter ( _videoComponent, function(){
            app.emit( _options.messages.fullscreen.activated, {} );
        });
    }

    /**
     * CancelFullScreen
     * @private
     */
    function _cancelFullScreen ()
    {
        app.utils.fullscreen.exit( function(){
            app.emit(_options.messages.fullscreen.disabled,{});
        });
    }

    /**
     * Init UI
     * @private
     */
    var _initUI = function ()
    {
        if( !app.video.isSupported() )
        {
            app.emit( app.video.messages.errorOldBrowser, {} );
        }

        app.video.INITIALIZED = true;
    };

    /**
     *  Initialize and Render
     * @returns {*|{}}
     */
    app.video.init = function ()
    {
        _initUI();
        _dom.render( _videoComponent, app.video.root() );
    };

    /**
     *  DOM Version
     */
    app.video.render = function ()
    {
        _initUI();

        return _videoComponent;
    };

    window.addEventListener('keyup',function( event ){

        if( app.video.INITIALIZED )
        {
            event.stopImmediatePropagation();

            switch ( event.keyCode )
            {
                case 32:

                    app.video.play();

                    break;
                case 179:

                    app.video.play();

                    break;
                case 39:

                    app.video.fastForward();
                    app.components.publish( _options.messages.elements.show, {} );

                    break;
                case 37:

                    app.video.fastRewind();
                    app.components.publish( _options.messages.elements.show, {} );

                    break;
                case 27:
                    _cancelFullScreen();
                    break;
                case 38:
                case 175:

                    if( _isFullScreenEnabled )
                    {
                        app.video.volumeUp();
                        app.components.publish( _options.messages.elements.show, {} );
                    }
                    break;

                case 40:
                case 174:

                    if( _isFullScreenEnabled )
                    {
                        app.video.volumeDown();
                        app.components.publish( _options.messages.elements.show, {} );
                    }
                    break;

                case 81:

                    if( _isFullScreenEnabled )
                    {
                        if( !_isQueueRendered )
                        {
                            app.emit( _options.messages.queue.visible, {queue: app.video.queue()} );
                        }else {
                            app.emit( _options.messages.queue.hidden, {} );
                        }
                    }
                    break;

                default :
                    break;
            }
        }
    }, false);

}(R || {}));
(function ( app, undefined ){ 'use strict';

    /**
     * R.sound UI
     * @author David BONDUKU
     */

    var _root = document.body,
        _default_ui = 'minimal',
        _dom = app.DOM,
        _component = app.createComponent,
        _isQueueRendered  = false,

        _QueueMeta,
        _MetaItemUI,
        _CreateMenuItem,
        _QueueContainer,
        _QueueUI,
        _MetaTrackUI,
        _ButtonPlayerUI,
        _VolumeUI,
        _VolumeQueueDurationUI,
        _ProgressUI,
        _CommandUI,
        _CommandContainerUI,
        _MainUI,

        _messages = {
            showMenu: 'rjs.sound.ui.menu.visible',
            queue:{
                show: 'rjs.sound.ui.queue.show',
                hidden: 'rjs.sound.ui.queue.hidden'
            }
        },

        _i18n,

        _menuItemi18n = {
            fr:{
                download: 'Télécharger',
                remove: 'Supprimer',
                share: 'Partager',
                play: 'Lire',
                pause: 'Pause'
            },
            en:{
                download: 'Download',
                remove: 'Delete',
                share: 'Share',
                play:' Play',
                pause: 'Pause'
            }
        };

    /**
     * Internationalization For Menu
     */
    _i18n = _menuItemi18n[ app.utils.detectUserLanguage() ];
    /**
     *
     * @type {boolean}
     */

    app.sound.initialized = false;

    /**
     * PlayNextSongOnError
     * @private
     */

    function _playNextSongOnError()
    {
        if( app.sound.hasNext() )
        {
            app.sound.next();
        }
    }

    /**
     * Queue Meta
     */

    _QueueMeta = _component('rjs-sound-ui-queue-meta', {

        messages: [

            app.sound.messages.start,
            app.sound.messages.error,
            app.sound.messages.queueChanged

        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.start:

                    if( app.sound.initialized )
                    {
                        element.title.textContent = data.id;
                        element.artist.textContent = data.artist;
                        element.poster.src = data.poster;
                        element.poster.className = 'rjs-sound-ui-queue-meta-poster rjs-sound-ui-large-poster';
                    }

                    break;

                case app.sound.messages.error:

                    element.title.textContent = '';
                    element.artist.textContent = '';
                    element.poster.src = '';
                    element.poster.className = 'rjs-sound-ui-queue-meta-poster';

                    setTimeout( function (){
                        _playNextSongOnError();
                    },1000);

                    break;

                case app.sound.messages.queueChanged:

                    if( app.sound.queueCount() == 0 )
                    {
                        element.title.textContent = '';
                        element.artist.textContent = '';
                        element.poster.src = '';
                        element.poster.className = 'rjs-sound-ui-queue-meta-poster';
                    }

                    break;
            }
        },

        render: function ()
        {
            return {
                poster: _dom.img({className: 'rjs-sound-ui-queue-meta-poster', src: ''}),
                title: _dom.p({className: 'rjs-sound-ui-queue-meta-title'}, null),
                artist: _dom.p({className: 'rjs-sound-ui-queue-meta-artist'}, null)
            }
        }
    });
    /**
     * MetaName Item
     */
    _MetaItemUI = _component('rjs-sound-ui-queue-item-menu-meta',{

        messages: [

            _messages.showMenu,
            app.sound.messages.error

        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case _messages.showMenu:

                    element.poster.src = data.item.poster;
                    element.title.textContent = data.item.id;
                    element.artist.textContent = data.item.artist;

                    break;

                case app.sound.messages.error:

                    element.poster.src = '';
                    element.title.textContent = '';
                    element.artist.textContent = '';

                    setTimeout( function (){
                        _playNextSongOnError();
                    },1000);

                    break;
            }
        },

        render: function ()
        {
            return {
                poster: _dom.img({className:'rjs-sound-ui-queue-item-menu-picture',src:''}),
                title: _dom.p({className:'rjs-sound-ui-queue-item-menu-title'}, null),
                artist: _dom.p({className:'rjs-sound-ui-queue-item-menu-artist'}, null)
            };
        }
    });
    /**
     * MenuItem
     */
    _CreateMenuItem = _component('rjs-sound-ui-queue-item-menu',{

        oncontextmenu: function( event )
        {
            event.preventDefault();
        },

        doShare: function ()
        {
            //app.emit(app.sound.messages.share,)
        },

        messages: [

            _messages.showMenu

        ],

        onmessage: function( name, data, element )
        {

            switch ( name )
            {
                case _messages.showMenu:

                    element.metaItem.parentNode.className = 'rjs-sound-ui-queue-item-menu rjs-sound-ui-show';
                    element.metaItem.parentNode.style.left = ( data.position.clientX - element.metaItem.clientWidth )+'px';
                    element.metaItem.parentNode.style.top = (( data.position.clientY - 10 )/ 10 )+'%';

                    element.play.onclick = function ()
                    {
                        app.sound.setIndex( data.index );
                        app.sound.play( data.index );
                    };

                    element.remove.onclick = function ()
                    {
                        app.sound.remove( data.index );
                    };

                    if( _isCurrentIndex( data.index ) )
                    {
                        element.play.textContent = _i18n.pause;
                        element.remove.className = 'rjs-sound-ui-queue-item-menu-remove rjs-sound-ui-hidden';

                    }else{

                        element.play.textContent = _i18n.play;
                        element.remove.className = 'rjs-sound-ui-queue-item-menu-remove rjs-sound-ui-show';
                    }

                    break;
            }
        },

        render: function ()
        {

            return {
                metaItem: _MetaItemUI,
                play: _dom.div({className: 'rjs-sound-ui-queue-item-menu-play'}, _i18n.play ),
                remove: _dom.div({className: 'rjs-sound-ui-queue-item-menu-remove'}, _i18n.remove ),
                share: _dom.div({className: 'rjs-sound-ui-queue-item-menu-share'}, _i18n.share )
            };
        }
    });

    /**
     * QueueContainer
     */

    _QueueContainer = _component('rjs-sound-queue-container',{

        showPoster: function ()
        {
            this.parentNode.style.display = "none";
        },

        messages: [

            app.sound.messages.queueChanged
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.queueChanged:

                    if( _isQueueRendered )
                    {
                        _updateQueueItem( data );
                    }

                    break;
            }
        },

        render: function ()
        {
            return {
                action: _dom.a({className:"rjs-sound-queue-action-poster", onclick: this.showPoster },"X"),
                list: _dom.div({className:"rjs-sound-queue-list"}, null)

            };
        }
    });

    /**
     * Queue
     */
    _QueueUI = _component('rjs-sound-queue-ui',{

        didMount: function ()
        {
            /**
             * Listen Mount Event
             */
            app.components.subscribe('mount',function( topic, data ){

                if( data.name === "rjs-sound-queue-ui" )
                {
                    _isQueueRendered = true;

                    _updateQueueItem( app.sound.queue() );
                    app.emit( _messages.queue.show, {} );
                }
            });
            /**
             *  Listen UnMount Event
             */
            app.components.subscribe('unmount',function( topic, data ){

                if( data.name === "rjs-sound-queue-ui" )
                {
                    _isQueueRendered = false;
                    app.emit( _messages.queue.hidden, {} );
                }
            });
        },

        showQueueList: function ()
        {
            _QueueContainer.style.display = "block";
        },

        render: function ()
        {
            return {
                close: _dom.a({className: 'rjs-sound-queue-plist fa fa-bars', onclick: this.showQueueList }, null),
                queueMeta: _QueueMeta,
                queue: _QueueContainer,
                menuItem: _CreateMenuItem
            };
        }
    });

    /**
     * Meta Track Container
     * @returns {HTMLElement|*}
     * @private
     */
    _MetaTrackUI = _component('rjs-sound-ui-meta-container',{

        messages: [

            app.sound.messages.start,
            app.sound.messages.queueChanged,
            app.sound.messages.error

        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.start:

                    element.poster.style.backgroundImage = '';
                    element.poster.style.backgroundImage = 'url('+data.poster+')';
                    element.title.textContent = data.id;
                    element.artist.textContent = data.artist;

                    break;

                case app.sound.messages.queueChanged:

                    if( app.sound.queueCount() == 0 )
                    {
                        element.poster.style.backgroundImage = '';
                        element.poster.style.backgroundImage = '';
                        element.title.textContent = '';
                        element.artist.textContent = '';
                    }

                    break;

                case app.sound.messages.error:

                    element.poster.style.backgroundImage = '';
                    element.poster.style.backgroundImage = '';
                    element.title.textContent = '';
                    element.artist.textContent = '';

                    break;
            }
        },

        render: function ()
        {
            return {
                poster: _dom.div({className: 'rjs-sound-ui-meta-poster'}, null),
                title: _dom.p({className: 'rjs-sound-ui-meta-title'}, null),
                artist: _dom.p({className: 'rjs-sound-ui-meta-artist'}, null)
            };
        }
    });
    /**
     * Buttons Command
     */
    _ButtonPlayerUI = _component('rjs-sound-ui-buttons',{

        play: function () { app.sound.play(); },

        shuffle: function () { app.sound.randomize(); },

        previous: function () { app.sound.previous(); },

        next: function () { app.sound.next(); },

        repeat: function () { app.sound.repeat(); },

        messages: [

            app.sound.messages.start,
            app.sound.messages.paused,
            app.sound.messages.stopped,
            app.sound.messages.repeat,
            app.sound.messages.error

        ],

        onmessage: function( name, data, element)
        {

            switch ( name )
            {
                case app.sound.messages.start:

                    element.play.className = 'rjs-sound-ui-music rjs-sound-ui-pause';

                    break;
                case app.sound.messages.paused:

                    element.play.className = 'rjs-sound-ui-music rjs-sound-ui-play';

                    break;
                case app.sound.messages.stopped:

                    element.play.className = 'rjs-sound-ui-music rjs-sound-ui-play';

                    break;

                case app.sound.messages.error:

                    element.play.className = 'rjs-sound-ui-music rjs-sound-ui-play';

                    break;

                case app.sound.messages.repeat:

                    if( data.repeat === 'off' )
                    {

                        element.repeat.className = 'rjs-sound-ui-buttons-repeat rjs-sound-ui-disabled';

                    }else{

                        element.repeat.className = 'rjs-sound-ui-buttons-repeat rjs-sound-ui-enabled';

                    }
                    break;
            }
        },

        render: function ()
        {
            return {
                shuffle: _dom.div({className:'rjs-sound-ui-buttons-shuffle', onclick: this.shuffle },null),
                previous: _dom.div({className:'rjs-sound-ui-buttons-prev', onclick: this.previous },null),
                play: _dom.div({className:'rjs-sound-ui-music rjs-sound-ui-play', onclick: this.play },null),
                next: _dom.div({className:'rjs-sound-ui-buttons-next', onclick: this.next },null),
                repeat: _dom.div({className:'rjs-sound-ui-buttons-repeat rjs-sound-ui-disabled', onclick: this.repeat },null)
            }
        }
    });
    /**
     * Volume
     */
    _VolumeUI = _component('rjs-sound-ui-volume-container',{

        changeVolume: function ( event )
        {
            var volumeValue = ( event.offsetX / this.clientWidth ) * 100;
            app.sound.setVolume( volumeValue );
        },

        onclick: function( event )
        {
            this.changeVolume( event );
        },

        onmouseup: function ( event )
        {
            this.changeVolume( event );
        },

        messages: [

            app.sound.messages.volumeChanged

        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.volumeChanged:

                    element.level.style.width = app.sound.volume()+'%';

                    break;
            }
        },

        render: function ()
        {
            return {
                level: _dom.div({className: 'rjs-sound-ui-volume-level'}, null)
            };
        }
    });

    /**
     * Volume Queue and Duration
     */
    _VolumeQueueDurationUI = _component('rjs-sound-ui-volume-queue-buttons-container',{

        onQueueShow: function ()
        {
            if( _isQueueRendered )
            {
                _hideQueue();
                this.className = "rjs-sound-ui-queue-icon rjs-sound-ui-disabled";

            }else if(  app.sound.queueCount() > 0 )
            {
                _showQueue();
                this.className = "rjs-sound-ui-queue-icon rjs-sound-ui-enabled";
            }
        },

        messages: [

            app.sound.messages.queueChanged,
            app.sound.messages.timeupdated,
            app.sound.messages.error

        ],

        onmessage : function ( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.queueChanged:

                    if( app.sound.queueCount() == 0 )
                    {
                        if( _isQueueRendered )
                        {
                            _hideQueue();
                            element.queueIcon.className = "rjs-sound-ui-queue-icon rjs-sound-ui-disabled";
                        }

                        element.currentTime.textContent = '';
                        element.duration.textContent = '';

                    }

                    break;

                case app.sound.messages.timeupdated:

                    if( app.sound.initialized )
                    {
                        element.currentTime.textContent = app.utils.formatTime( data.currentTime );
                        element.duration.textContent = app.utils.formatTime( data.duration );
                    }

                    break;

                case  app.sound.messages.error:

                    element.currentTime.textContent = '';
                    element.duration.textContent = '';

                    break;
            }
        },

        render: function ()
        {
            return {
                currentTime: _dom.div({className:'rjs-sound-ui-current-time'},null),
                duration: _dom.div({className:'rjs-sound-ui-duration'},null),
                queueIcon: _dom.span({className:'rjs-sound-ui-queue-icon rjs-sound-ui-disabled', onclick:this.onQueueShow },null),
                volumeIcon: _dom.span({className:'rjs-sound-ui-volume-icon'},null),
                volumeUI: _VolumeUI
            };
        }
    });

    /**
     * Progress UI Component
     */
    _ProgressUI = _component('rjs-sound-ui-progress-container',{

        seek: function ( event )
        {
            app.sound.seek( event.offsetX / this.clientWidth );
        },

        onclick: function( event )
        {
            this.seek( event );
        },

        onmouseup: function ( event )
        {
            this.seek( event );
        },

        messages: [

            app.sound.messages.seeking,
            app.sound.messages.timeupdated,
            app.sound.messages.error,
            app.sound.messages.queueChanged

        ],

        onmessage: function (name, data, element)
        {
            switch ( name )
            {
                case app.sound.messages.seeking:

                    element.level.style.width = app.sound.currentTime()+'%';

                    break;
                case app.sound.messages.timeupdated:

                    element.level.style.width = app.sound.currentTime()+'%';

                    break;

                case app.sound.messages.error:

                    element.level.style.width = 0;

                    break;
                case app.sound.messages.queueChanged:

                    if( app.sound.queueCount() == 0 )
                    {
                        element.level.style.width = 0;
                    }
                    break;
            }
        },

        render: function ()
        {
            return {
                buffered: _dom.div({className: 'rjs-sound-ui-progress-buffered'}, null),
                level: _dom.div({className: 'rjs-sound-ui-progress-level'}, null)
            };
        }
    });
    /**
     * Command UI Component
     */
    _CommandUI = _component('rjs-sound-ui-command',{

        render: function ()
        {
            return {
                meta: _MetaTrackUI,
                buttons: _ButtonPlayerUI,
                volumeQueueDuration: _VolumeQueueDurationUI,
                progressUI: _ProgressUI
            };
        }
    });
    /**
     * Command Container Component
     */
    _CommandContainerUI = _component('rjs-sound-ui-command-container',{

        render: function ()
        {
            return {
                command: _CommandUI
            };
        }
    });

    /**
     * Main UI
     */
    _MainUI = _component('rjs-sound-ui',{

        oncontextmenu: function ( event )
        {
            event.preventDefault();
        },

        onclick: function ()
        {
            _hideQueueMenu();
        },
        messages : [

            _messages.queue.hidden,
            _messages.queue.show

        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case _messages.queue.hidden:

                    element.queue.parentNode.style.height = '60px';

                    break;
                case _messages.queue.show:

                    element.queue.parentNode.style.height = '100%';

                    break;
            }
        },

        render: function ()
        {
            return {
                command: _CommandContainerUI,
                queue: _QueueUI
            };
        }
    });

    /**
     * Update Queue Item
     * @param collection
     * @private
     */
    function _updateQueueItem( collection )
    {
        var container = _QueueContainer.lastChild,
            fragment = document.createDocumentFragment();

        if( !collection.length ) return;

        collection.map( function( data, index ){
            _createItem( data, fragment, index );
        });

        container.innerHTML = '';

        _dom.append( container, fragment );
    }
    /**
     * Create Queue Item
     * @param data
     * @param fragment
     * @param index
     * @private
     */
    function _createItem( data, fragment, index )
    {

        var Item = _component('rjs-sound-queue-collection-item',{

            dataIndex: index,

            showMenu : function ( event )
            {
                var currentIndex = parseInt( this.dataset.index );

                app.components.publish( _messages.showMenu,{ index:currentIndex, item: data, position: event } );
            },

            onclick: function ()
            {
                var currentIndex = parseInt( this.dataset.index );

                app.sound.setIndex( currentIndex );
                app.sound.play( currentIndex );

            },

            oncontextmenu: function ( event )
            {
                this.showMenu( event );
                event.preventDefault();
            },

            render: function ()
            {
                return {
                    title : _dom.p({className:'rjs-sound-queue-collection-item-title'}, data.id || ''),
                    artist: _dom.p({className:'rjs-sound-queue-collection-item-artist'}, data.artist || ''),
                    menu : _dom.span({className:'rjs-sound-queue-collection-item-menu', dataIndex: index, onmouseenter: this.showMenu  },'...')
                }
            }
        });

        app.sound.on('timeupdate',function(){
            _setQueueCurrentBoxOnPlaying( Item, index );
        },false);

        fragment.appendChild( Item );
    }


    /**
     * Set Queue CurrentPlay BoxColor
     * @param item
     * @param index
     * @private
     */
    function _setQueueCurrentBoxOnPlaying( item, index )
    {
        if( _isCurrentIndex( index ) )
        {
            item.className = 'rjs-sound-queue-collection-item rjs-sound-ui-queue-current-playing';
        }else{
            item.className = 'rjs-sound-queue-collection-item';
        }
    }


    /**
     * Show Queue
     * @private
     */
    function _showQueue()
    {
        app.components.mount( 'rjs-sound-queue-ui' );
    }

    /**
     * Hide Queue Menu
     * @private
     */
    function _hideQueueMenu()
    {
        _CreateMenuItem.className = 'rjs-sound-ui-queue-item-menu rjs-sound-ui-hidden';
    }

    /**
     * Hide Queue
     * @private
     */
    function _hideQueue()
    {
        app.components.unmount( 'rjs-sound-queue-ui' );
    }

    /**
     * is Current Index
     * @param currentIndex
     * @returns {boolean}
     * @private
     */
    function _isCurrentIndex( currentIndex )
    {
        return ( app.sound.currentIndex() === currentIndex && app.sound.isPlaying );
    }

    /**
     * Config
     * @param options
     * @param options.root {string}
     */
    app.sound.config = function( options )
    {
        options = options || {};
        _root = options.root || _root;
        _default_ui = options.ui || "mininal";

        return this;
    };
    /**
     * Init APPLICATION UI
     * @private
     */
    var _initUI = function ()
    {
        app.sound.initialized = true;
    };

    /**
     * Init
     * @returns {{}}
     */
    app.sound.init = function ()
    {
        _initUI();

        if( _default_ui === "full" )
        {
            _dom.render( _MainUI, _root );
        }else{
            _dom.render( app.sound.nextui, _root );
        }

        return app.sound;
    };
    /**
     * Sound UI DOM
     * @returns {*}
     */
    app.sound.render = function ()
    {
        _initUI();

        if( _default_ui === "full" )
        {
            return _MainUI;
        }else{
            return app.sound.nextui;
        }
    };

    app.utils.extend( app.sound.messages, _messages );

    window.addEventListener('keyup', function( event ){

        if( app.sound.initialized )
        {
            event.stopImmediatePropagation();

            switch ( event.keyCode )
            {
                case 32:

                    app.sound.play();

                    break;

                case 39:

                    app.sound.fastForward();

                    break;

                case 37:

                    app.sound.fastRewind();

                    break;

                case 27:

                    if( _isQueueRendered )
                    {
                        _hideQueue();
                    }

                    break;

                default :
                    break;
            }
        }

    }, false);

}(R || {}));
(function( app, undefined ){"use strict";
    /**
     * Rouah PictureViewer
     */
    var Main,
        currentPictureUrl,
        timerCommand,
        messages = {
            zoomIn: "rjs-picture-zoom-in",
            zoomOut: "rjs-picture-zoom-out",
            rotate: "rjs-picture-rotate",
            enterFullscreen:"rjs-picture-fullscreen-enter",
            quitFullscreen:"rjs-picture-fullscreen-quit",
            showNext:"rjs-picture-nav-next",
            showPrev:"rjs-picture-nav-previous",
            current: "rjs-picture-nav-current",
            showMoreThumbnails:"rjs-picture-show-more-thumbnails",
            showViewer:"rjs-picture-show-viewer",
            closeViewer: "rjs-picture-close-viewer",
            addPicture: "rjs-picture-collection-add",
            removePicture: "rjs-picture-collection-remove",
            clearAll: "rjs-picture-collection-clear-all",
            errorAdd:"rjs-picture-error-add"
        },
        Bottom,
        Error,
        Picture,
        pictures = [],
        currentIndex = 0,
        zoomOffset = 0.1,
        rotateOffset = 0,
        zoomed = false,
        Prev,
        Next,
        Command,
        Description,
        component = app.createComponent,
        dom = app.DOM;
    /**
     *
     * @type {*|Object}
     */
    Description = component("rjs-picture-description",{

        messages: [
            messages.showViewer,
            messages.current
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.showViewer:


                    _setDescription( element, data.currentIndex );

                    break;

                case messages.current:

                    _setDescription( element, data.currentIndex );

                    break;
            }
        },

        render: function ()
        {
            return {
                title: app.createElement("h2",{}, null)
            }
        }
    });
    /**
     *
     */
    Command = component("rjs-picture-command",{

        onmouseenter:function ()
        {
            clearTimeout(timerCommand);
            _showCommand();
        },

        zoomIn: function ()
        {
            app.emit( messages.zoomIn );
        },

        zoomOut: function ()
        {
            app.emit( messages.zoomOut );
        },

        rotate: function ()
        {
            app.emit( messages.rotate );
        },

        messages:[
            messages.enterFullscreen,
            messages.quitFullscreen,
            messages.showViewer
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.enterFullscreen:

                    element.fullscreen.className = "rjs-picture-action-fullscreen--exit";

                    element.fullscreen.onclick = _exitFullScreen;

                    break;

                case messages.quitFullscreen:

                    element.fullscreen.className = "rjs-picture-action-fullscreen--enter";

                    element.fullscreen.onclick = _goFullscreen;

                    break;

                case  messages.showViewer:

                    clearTimeout(timerCommand);
                    _hideCommand();

                    break;

            }
        },

        render: function ()
        {
            var rotate = dom.div({className:"rjs-picture-command-rotate", onclick: this.rotate }, null);
            rotate.innerHTML = "&#8635;";
            return {
                zoomIn: dom.div({className:"rjs-picture-command-zoom-in", onclick: this.zoomIn }, null),
                zoomOut: dom.div({className:"rjs-picture-command-zoom-out", onclick: this.zoomOut }, null),
                rotate: rotate,
                fullscreen: dom.div({className:"rjs-picture-action-fullscreen--enter", onclick: _goFullscreen }, null)
            }
        }
    });

    /**
     *
     * @private
     */
    function _hideCommand()
    {
        timerCommand = setInterval(function(){
            Command.style.opacity = 0;
        },3000);
    }

    /**
     *
     * @private
     */
    function _showCommand(){
        Command.style.opacity = 0.99;
    }

    /**
     *
     * @type {*|Object}
     */
    Picture = component("rjs-picture-viewer",{


        onclick: function ()
        {
            clearTimeout(timerCommand);
            _showCommand();
        },

        onmouseover: function ()
        {
            clearTimeout(timerCommand);
            _showCommand();
        },

        messages: [
            messages.current,
            messages.showViewer,
            messages.rotate,
            messages.zoomIn,
            messages.zoomOut,
            messages.showNext,
            messages.showPrev
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.current:

                    _setPicture( element, data.currentIndex );

                    break;

                case messages.showViewer:

                    _setPicture( element, data.currentIndex );
                    element.picture.parentNode.style.height = ( pictures.length > 1 ) ? "80%": "91%";


                    break;

                case messages.zoomIn:

                    _zoomIn( element.picture );

                    break;

                case messages.zoomOut:

                    _zoomOut( element.picture );

                    break;

                case messages.rotate:

                    _rotate( element.picture );

                    break;

                case messages.showNext:


                    break;

                case messages.showPrev:


                    break;
            }
        },

        render: function ()
        {
            var img = dom.img({src:'',className:'rjs-picture-viewer-full--viewer'}, null);
            return {
                picture: dom.div({className:"rjs-picture-viewer-full"},img),
                command: Command,
                desc: Description
            }
        }
    });

    /**
     *
     * @type {*|Object}
     */
    Bottom = component("rjs-picture-bottom",{

        messages: [
            messages.addPicture,
            messages.showNext,
            messages.showPrev
        ],

        onmessage: function (name, data, element )
        {
            switch ( name )
            {
                case messages.addPicture:

                    _addThumbnail( data, element.list );

                    element.list.parentNode.style.display = ( pictures.length > 1 ) ? "block": "none";

                    break;

                case messages.showNext:

                    element.list.parentNode.style.display = ( pictures.length > 1 ) ? "block": "none";

                    break;

                case messages.showPrev:

                    element.list.parentNode.style.display = ( pictures.length > 1 ) ? "block": "none";

                    break;
            }
        },

        render: function ()
        {
            return {
                list: dom.div({className:"rjs-picture-thumbnails"}, null)
            }
        }
    });
    /**
     *
     * @type {*|Object}
     */
    Prev = component("rjs-picture-nav-prev",{

        showPrev: function ()
        {
            _prev();
        },

        messages:[
            messages.showPrev,
            messages.showViewer
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.showPrev:

                    element.command.style.display =  _hasPrev() ? "block":"none";

                    break;
                case messages.showViewer:

                    element.command.style.display =  _hasPrev() ? "block":"none";

                    break;
            }
        },

        render: function ()
        {
            return {
                command:dom.div({className:"rjs-picture-nav-prev-action", onclick: this.showPrev})
            }
        }
    });
    /**
     *
     * @type {*|Object}
     */
    Next = component("rjs-picture-nav-next",{

        showNext: function ()
        {
            _next();
        },

        messages:[
            messages.showPrev,
            messages.showViewer
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.showPrev:

                    element.command.style.display =  _hasNext() ? "block":"none";

                    break;
                case messages.showViewer:

                    element.command.style.display =  _hasNext() ? "block":"none";

                    break;
            }
        },

        render: function ()
        {
            return {
                command:dom.div({className:"rjs-picture-nav-next-action", onclick: this.showNext})
            }
        }
    });
    /**
     *
     */
    Error = component("rjs-picture-error",{

        close: function ()
        {
            this.parentNode.style.display = "none";
        },

        messages: [
            messages.errorAdd
        ],

        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case messages.errorAdd:

                    element.close.parentNode.style.display = "block";

                    break;
            }
        },

        render: function ()
        {
            return {
                close: dom.div({className:"rjs-picture-error-close", onclick: this.close}, "X"),
                title: app.createElement("h2",{className:"rjs-picture-error-title"}, "CAN'T SHOW THIS PICTURE"),
                desc: dom.p({}, "Please read documentation for further information...")
            }
        }
    });

    /**
     *
     * @type {*|Object}
     */
    Main = component("rjs-picture",{

        close: function ()
        {
            app.emit( messages.closeViewer );
            _exitFullScreen();
        },

        messages: [
            messages.addPicture,
            messages.clearAll,
            messages.closeViewer,
            messages.showViewer
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case messages.addPicture:


                    break;
                case messages.clearAll:

                    pictures = [];

                    break;
                case messages.closeViewer:

                    element.picture.parentNode.style.top = "-200%";

                    break;

                case messages.showViewer:

                    element.picture.parentNode.style.top = 0;
                    currentIndex = data.currentIndex;

                    break;
            }
        },

        render: function ()
        {
            return{
                close: dom.div({className:"rjs-picture-action-close", onclick: this.close }, "X"),
                picture: Picture,
                next: Next,
                prev: Prev,
                bottom: Bottom,
                error: Error
            }
        }
    });
    /**
     *
     * @param data
     * @returns {*|Object}
     * @private
     */
    function _Thumb( data )
    {
        return component("rjs-picture-thumb",{

            dataModel: JSON.stringify( data ),

            showPicture: function ()
            {
                var model = JSON.parse( this.parentNode.dataset.model );

                app.emit( messages.current,{ currentIndex: model.index });
            },

            render: function()
            {
                return {
                    picture: dom.div({className:"rjs-picture-thumb-icon", style:"background:url('"+data.thumbnail+"')", onclick: this.showPicture }, null)
                }
            }
        });
    }

    /**
     *
     * @param data
     * @param list
     * @private
     */
    function _addThumbnail( data, list )
    {
        var fragment = document.createDocumentFragment();

        data.map(function( item, index ){
            item.index = index;
            fragment.appendChild( _Thumb( item ) );
        });

        list.innerHTML = "";
        list.appendChild( fragment );
    }

    /**
     *
     * @param data
     * @usage addPicture([{url:"",thumbnail:"",title:""}])
     * @private
     */
    function _addPicture( data )
    {
        if( Array.isArray( data ))
        {
            data.map( function( item ){

                if( _check( item ) )
                {
                    pictures.push( item );
                    app.emit( messages.addPicture, pictures );
                }else{
                    app.emit( messages.errorAdd );
                }
            });

        }else{

            if( _check( data ) )
            {
                pictures.push( data );
                app.emit( messages.addPicture, pictures );
            }else{
                app.emit( messages.errorAdd );
            }
        }
    }

    /**
     *
     * @param item
     * @returns {*|string|string}
     * @private
     */
    function _check( item )
    {
        return ( item.title !== undefined && item.url && item.thumbnail !== undefined )
    }



    /**
     *
     * @returns {*|Object}
     * @private
     */
    function _render()
    {
        return Main;
    }

    /**
     *
     * @param element
     * @param index
     * @private
     */
    function _setPicture( element, index )
    {
        var thumbUrl = pictures[ index ].thumbnail,
            url = pictures[ index ].url,
            loaded = false;

        element.picture.firstChild.src = thumbUrl;

        element.picture.firstChild.onload = function ()
         {
             if(!loaded)
             {
                 var that = this;
                 setTimeout(function(){
                     that.src = url;
                 },300);
                 loaded = true;
             }
         };
    }

    /**
     *
     * @param element
     * @param index
     * @private
     */
    function _setDescription( element, index )
    {
        setTimeout(function(){
            element.title.innerHTML = pictures[ index ].title || "";
        },180);
    }

    /**
     *
     * @private
     */
    function _show( options )
    {
        var options = options || {};
        var index = options.index || 0;
        options.ui = options.ui || "minimal";

        if( pictures.length > 0 )
            app.emit( messages.showViewer, {currentIndex: index} );

        if( options.ui != "full" )
        {
            _minimal();
        }
    }

    /**
     *
     * @private
     */
    function _next()
    {
        if( _hasNext() )
        {
            currentIndex++;
            _show( currentIndex );
            app.emit( messages.showNext );
        }
    }

    /**
     *
     * @private
     */
    function _prev()
    {
        if( _hasPrev() )
        {
            currentIndex--;
            _show( currentIndex );
            app.emit( messages.showPrev );
        }
    }

    /**
     *
     * @returns {boolean}
     */
    function _hasNext()
    {
        return ( currentIndex < pictures.length-1 && pictures.length > 0 );
    }

    /**
     *
     * @returns {boolean}
     */
    function _hasPrev()
    {
        return ( currentIndex > 0 && pictures.length > 0);
    }

    /**
     *
     * @returns {boolean}
     * @private
     */
    function _isEmpty()
    {
        return ( pictures[0].title === undefined );
    }

    /**
     *
     * @param picture
     * @private
     */
    function _zoomIn( picture )
    {
        if(zoomOffset < 1)
        {
            zoomOffset = 1;
        }

        picture.firstChild.style.transform = "scale("+zoomOffset+")";
        picture.firstChild.style.WebkitTransform = "scale("+zoomOffset+")";
        picture.firstChild.style.msTransform = "scale("+zoomOffset+")";

        zoomOffset = zoomOffset + 0.1;

        zoomed = true;
    }

    /**
     *
     * @param picture
     * @private
     */
    function _zoomOut( picture )
    {
        if( zoomOffset > 0 ){


            zoomOffset = zoomOffset - 0.1;

            picture.firstChild.style.transform = "scale("+zoomOffset+")";
            picture.firstChild.style.msTransform = "scale("+zoomOffset+")";
            picture.firstChild.style.WebkitTransform = "scale("+zoomOffset+")";

            zoomed = true;

        }else{
            zoomed = false;
        }

    }

    /**
     *
     * @param picture
     * @private
     */
    function _setToCurrentScale( picture )
    {
        picture.firstChild.style.transform = "scale("+zoomOffset+")";
        picture.firstChild.style.msTransform = "scale("+zoomOffset+")";
        picture.firstChild.style.WebkitTransform = "scale("+zoomOffset+")";
    }

    /**
     *
     * @param picture
     * @private
     */
    function _rotate( picture )
    {
        if( rotateOffset === 360 )
        {
            rotateOffset = 0;
        }else{
            rotateOffset += 90;
        }
        _setToCurrentScale( picture );

        picture.firstChild.style.transform = "rotate("+rotateOffset+"deg)";
        picture.firstChild.style.WebkitTransform = "rotate("+rotateOffset+"deg)";
        picture.firstChild.style.msTransform = "rotate("+rotateOffset+"deg)";

    }

    /**
     *
     * @param event
     * @private
     */
    function _specialZoom( event )
    {
        if( zoomed )
        {
            Picture.firstChild.style.top = event.screenY +100+"px";
        }
    }
    /**
     *
     * @private
     */
    function _goFullscreen()
    {
        app.utils.fullscreen.enter( Main, function(){
            app.emit( messages.enterFullscreen );
        });
    }

    /**
     *
     * @private
     */
    function _exitFullScreen()
    {
        app.utils.fullscreen.exit(function () {
            app.emit( messages.quitFullscreen );
        });
    }

    /**
     *
     * @private
     */
    function _minimal()
    {
        Picture.setAttribute("style","margin-top:0 !important; height:86% !important;");
        app.components.unmount('rjs-picture-description');
        document.querySelector('.rjs-picture-action-close').style.display = "none";
    }

    /**
     *
     * @private
     */
    function _clearAll()
    {
        pictures = [];
    }

    /**
     *
     * @type {{add: _addPicture, render: _render, show: _show, minimal: _minimal}}
     */
    app.Gallery = {
        add: _addPicture,
        render: _render,
        show:_show,
        clear: _clearAll
    };

}(R || {}));

(function( app, undefined ){"use strict";

    /***
     * Sound UI Next
     */

    var SoundUI,
        VolumeUI,
        TimeUI,
        QueueUI,
        dom = app.DOM,
        component = app.createComponent,
        CoverUI,
        ErrorUI,
        ShareUI,
        CommandUI,
        ProgressUI,
        OverlayUI,
        PosterUI;
    /**
     * @description
     */
    ShareUI = component("rjs-sound-next-sharer",{

        doClose: function ()
        {
            this.parentNode.style.display = "none";
        },

        render: function ()
        {
            return {
                close: dom.div({className:"rjs-sound-next-share-close", onclick: this.doClose },"X")
            }
        }
    });
    /**
     * @description
     */
    ErrorUI = component("rjs-sound-next-error",{

        messages: [
            app.sound.messages.error
        ],

        doClose: function ()
        {
            this.parentNode.style.display = "none";
        },

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.error:

                    element.close.parentNode.style.display = "block";
                    break;
            }
        },

        render: function ()
        {
            return {
                close: dom.div({className:"rjs-sound-next-error-close", onclick: this.doClose },"X"),
                title: app.createElement("h1",{className:"rjs-sound-next-error-title"}, "CAN NOT PLAY THIS FILE"),
                message: app.createElement("h2",{className:"rjs-sound-next-error-message"}, "Please retry later...")
            }
        }
    });
    /**
     * @description
     */
    PosterUI = component("rjs-sound-next-poster",{

        messages:[
            app.sound.messages.start,
            app.sound.messages.queueChanged
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.start:


                    element.title.innerHTML = data.id || '';
                    element.poster.style.backgroundImage = "url('"+data.poster+"')";

                    break;

                case app.sound.messages.queueChanged:

                    break;
            }
        },

        render: function ()
        {
            return {
                poster: dom.div ({className:"rjs-sound-next-poster-ui"}, null),
                title: app.createElement("h3",{className:"rjs-sound-next-poster-title"}, null)
            }
        }
    });
    /**
     * @description
     */
    CommandUI = component("rjs-sound-next-command",{

        messages:[
            app.sound.messages.start,
            app.sound.messages.stopped,
            app.sound.messages.paused,
            app.sound.messages.queueChanged
        ],

        previous: function ()
        {
            app.sound.previous();
        },
        play: function()
        {
            app.sound.play();
        },
        next: function()
        {
            app.sound.next();
        },

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.start:

                    element.play.firstChild.className = "rjs-sound-next-command-pause fas fa-pause";
                    element.next.style.opacity = ( app.sound.hasNext() ) ? "1":"0.1";
                    element.previous.style.opacity = ( app.sound.hasPrev() ) ? "1":"0.1";

                    break;
                case app.sound.messages.stopped:

                    element.play.firstChild.className = "rjs-sound-next-command-play fas fa-play";

                    break;
                case app.sound.messages.paused:

                    element.play.firstChild.className = "rjs-sound-next-command-play fas fa-play";
                    break;

                case app.sound.messages.queueChanged:

                    element.next.style.opacity = ( app.sound.hasNext() ) ? "1":"0.1";
                    element.previous.style.opacity = ( app.sound.hasPrev() ) ? "1":"0.1";

                    break;
            }
        },

        render: function ()
        {

            return {
                previous: dom.div({className:"rjs-sound-next-command-previous", onclick: this.previous }, null),
                play: dom.div({className:"rjs-sound-next-command-play-ctx", onclick: this.play }, dom.span({className:"rjs-sound-next-command-play fas fa-play"})),
                next: dom.div({className:"rjs-sound-next-command-next", onclick: this.next }, null)
            }
        }
    });
    /**
     *
     */
    TimeUI = component("rjs-sound-next-time",{

        messages: [
            app.sound.messages.timeupdated
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.timeupdated:

                    if( app.sound.initialized )
                    {
                        element.current.textContent = app.utils.formatTime( data.currentTime );
                        element.duration.textContent = app.utils.formatTime( data.duration );
                    }
                    break;
            }
        },

        render: function ()
        {
            return {
                current: dom.p({className:"rjs-sound-next-time-current"}, null),
                duration: dom.p({className:"rjs-sound-next-time-duration"}, null)
            }
        }
    });

    /**
     *
     */
    VolumeUI = component("rjs-sound-next-volume",{
        render: function ()
        {
            return {
                level: dom.div({className:"rjs-sound-next-volume-level"}, null)
            }
        }
    });

    /**
     *
     */
    QueueUI = component("rjs-sound-next-queue",{

        doClose: function ()
        {
            this.parentNode.style.display = "none";
        },

        render: function ()
        {
            return  {
                close: dom.div({className:"rjs-sound-next-queue-close", onclick: this.doClose }, "X"),
                header: dom.div({className:"rjs-sound-next-queue-header"}, null),
                list: dom.div({className:"rjs-sound-next-queue-items"}, null)
            }
        }
    });

    /**
     * @description: Progress bar UI
     */
    ProgressUI = component("rjs-sound-next-progress",{

        seek: function ( event )
        {
            app.sound.seek( event.offsetX / this.clientWidth );
        },

        onclick: function( event )
        {
            this.seek( event );
        },
        onmouseenter: function ()
        {
            this.lastChild.style.opacity = "1";
        },
        onmouseout: function ()
        {
            this.lastChild.style.opacity = "0";
        },

        messages: [
            app.sound.messages.timeupdated,
            app.sound.messages.seeking,
            app.sound.messages.error,
            app.sound.messages.start
        ],

        onmessage: function( name, data, element )
        {
            switch ( name )
            {
                case  app.sound.messages.timeupdated:

                    element.progress.style.width = app.sound.currentTime()+"%";
                    element.cursor.style.left = app.sound.currentTime()+"%";

                    break;

                case app.sound.messages.seeking:

                    element.progress.style.width = app.sound.currentTime()+"%";
                    element.cursor.style.left = app.sound.currentTime()+"%";


                    break;

                case app.sound.messages.error:

                    element.progress.style.width = 0;
                    element.progress.parentNode.style.display = "none";

                    break;

                case app.sound.messages.start:

                    element.progress.parentNode.style.display = "block";

                    break;
            }
        },

        render: function ()
        {
            return {
                progress: dom.div({className:"rjs-sound-next-progress-bar"}, null),
                cursor: dom.div({className:"rjs-sound-next-progress-cursor"}, null)
            }
        }
    });
    /**
     * @description
     */
    OverlayUI = component("rjs-sound-next-overlay",{
        render: function ()
        {
            return {
                child:dom.div({}, null)
            }
        }
    });
    /**
     * @description
     */
    CoverUI = component("rjs-sound-next-cover",{

        messages:[
            app.sound.messages.start
        ],
        onmessage: function ( name, data, element )
        {
            switch ( name )
            {
                case app.sound.messages.start:

                    element.poster.style.background = "url('"+data.poster+"')";

                    break;
            }
        },

        render: function ()
        {
            return {
                poster: dom.div({className:"rjs-sound-next-cover-poster"}, null)
            }
        }
    });

    /**
     * @description: This is the main UI
     */
    SoundUI = component("rjs-sound-next",{

        doShowQueue: function()
        {
            this.parentNode.lastChild.style.display = "block";
        },

        render: function ()
        {
            return  {

                share: ShareUI,
                error: ErrorUI,
                /**poster: PosterUI,**/
                command: CommandUI,
                progress:ProgressUI,
                timeui: TimeUI,
                queueIcon: dom.div({className:"rjs-sound-next-queue-icon", onclick: this.doShowQueue }, null),
                /**overlay: OverlayUI,**/
                /**cover: CoverUI,**/
                queue: QueueUI
            }
        }
    });

    app.sound.nextui = SoundUI;

}(R || {}));
