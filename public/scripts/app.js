window.addEventListener('load', function (e) {
    $('.newsClick').on('click', async function (e) {
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

    // $('.again').on('click', async function (e) {
    //     const data = await fetch('/admin/all/news/artcle').then(res => res.json())
    //     const topNew = data.find(news => {
    //         return news
    //     })
    //     console.log(topNew);
    // })
});