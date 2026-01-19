$(function(){
    $(".xzoom, .xzoom-gallery").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom1, .xzoom-gallery1").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom2, .xzoom-gallery2").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom3, .xzoom-gallery3").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom4, .xzoom-gallery4").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom5, .xzoom-gallery5").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    $(".xzoom6, .xzoom-gallery6").xzoom({
        zoomWidth:400,
        tint: "#333",
        Xoffset: 15,
    });

    /* =========================================
       Filter Logic
       ========================================= */
    $(".filter-btn").click(function() {
        var value = $(this).attr('data-filter');
        
        // Active Class Toggle
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        if(value == "all") {
            $(".product-item").fadeIn('1000');
        } else {
            $(".product-item").not("."+value).hide('3000');
            $(".product-item").filter("."+value).fadeIn('3000');
        }
        
        // Fix for AOS animations not triggering after filter
        setTimeout(function(){ 
             AOS.refresh(); 
        }, 500);
    });
});