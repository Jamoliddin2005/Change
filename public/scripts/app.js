window.addEventListener('load', function(e) {
    $('.newsClick').on('click', async function(e) {
        const data = await fetch('/admin/all/news/content').then(res => res.json())
        const topNew = data.find(news => {
            return news._id.toString() === this.dataset.id.toString()
        })
        $('.news-section_top .block').html(`
        <img src="/images/${topNew.img}" alt="" class="active-img">
        <div class="more">
        <div class="more_top">
            <div class="col-lg-4 left">
                <div class="user-img">
                    <img class="imgggg" src="../images/logo.png" alt="">
                    <div class="user-name">
                    <h4>ChangeIt-Academy</h4>
                    <h5>Meneger</h5>
                </div>
                </div>
            </div>
            <div class="col-lg-4 right">
                <p>${topNew.data}</p>
            </div>
        </div>
        <div class="more-bottom">
        <h2>${topNew.title}</h2>
        <h5>${topNew.more}</h5>
        </div>
    </div>`)
    })





    // $(function () {

    //     $('.load-more').on('click', function () {

    //     })

    //     // $('.load-more').on('click', function() {
    //     //     const btn = $(this)
    //     //     const loader = btn.find('span')
    //     //     $.ajax({
    //     //         url: '/admin/article/again',
    //     //         type: 'GET',
    //     //         beforeSend: function() {
    //     //             btn.attr('disabled', true)
    //     //             loader.addClass('d-inline-block')
    //     //         },
    //     //         success: function(response) {
    //     //             setTimeout(() => {
    //     //                 loader.removeClass('d-inline-block')
    //     //                 btn.attr('disabled', false)
    //     //                 console.log(response);
    //     //             }, 600);
    //     //         },
    //     //         error: function() {
    //     //             alert('Error!!!')
    //     //             loader.removeClass('d-inline-block')
    //     //             btn.attr('disabled', false)
    //     //         }
    //     //     })
    //     // })
    // });




});