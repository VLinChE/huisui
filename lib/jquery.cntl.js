(function($) {

    $.fn.cntl = function( options ) {

        /* 默认设置 */
        var settings = $.extend({
            revealbefore : 200, /* 这是“滚动填充”允许的数量(稍后将显示状态) */
            anim_class  : 'cntl-animate', /* anim类，这个类应该在css中有动画规则 */
            onreveal    : null /* 一旦被揭露，一个回调 */
        }, options);




        return this.each( function() {

            var statelist = $(this).find('.cntl-state');
            var bar_fill = $(this).find('.cntl-bar-fill');
            var states = [];
            var tbf = 0;


            function setupElements( )
            {

                for (var i = 0; i < statelist.length; i++) {

                    states[i] = {};
                    states[i]['top'] = $(statelist[i]).offset().top + settings.revealbefore;
                    states[i]['elm'] = $(statelist[i]);

                };


                revealElements();

            }

            function revealElements( )
            {

                var windowtop = $(window).scrollTop();
                var windowbtm = windowtop + $(window).height();

                for( var i = 0; i < states.length; i++) {

                    if( states[i].top > windowtop && states[i].top < windowbtm )
                    {
                        if ( 
                            !states[i].elm.hasClass( settings.anim_class ) && 
                            $.isFunction( settings.onreveal ) )
                        {
                            settings.onreveal.call( this, states[i].elm );
                        }

                        states[i].elm.addClass( settings.anim_class );
                        var h = states[i].elm.position().top;

                        if( h > tbf )
                        {
                            tbf = h;
                        }
                        bar_fill.height( tbf );

                    }
                };

            }

            $(window).on('scroll',revealElements);
            $(window).on('load',setupElements)

        });
    }

}(jQuery));
