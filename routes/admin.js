const { Router } = require("express");
const router = Router();
const toDelete = require("../middleware/toDelete");
const moment = require("moment");
const bcrypt = require("bcrypt");
const IndexHeader = require("../models/Index/HeaderImg");
const IndexHeaderText = require("../models/Index/HeaderText");
const IndexHeaderCourses = require("../models/Index/headerCourses");
const SectionTopLeft = require("../models/Index/SectionTopLeft");
const SectionTopRight = require("../models/Index/SectionTopRight");
const SectionCenterLeft = require("../models/Index/sectionCenterLeft");
const SectionCenterRight = require("../models/Index/sectionCenterRight");
const sectionDirection = require("../models/Index/sectDirections");
const sectionSystem = require("../models/Index/sectionSystem");
const fileUpload = require("../middleware/fileUpload");
const listGroup = require('../models/Index/certificatListgroup')
const imgAdd = require('../models/Index/sectionMedalImg')
const MedalImg = require('../models/Index/sertifikatImg')
const SliderUser = require('../models/Index/SliderUser')
const Partners = require('../models/Index/partner-img')
const AboutUsHeaderLeft = require('../models/AboutUs/Header/headerLeft')
const AboutUsHeaderRight = require('../models/AboutUs/Header/HeaderRight')
const ThisIs = require('../models/AboutUs/Section/ThisIs')
const ThisIsImg = require('../models/AboutUs/Section/ThisIsImg')
const ChangeItNumbers = require('../models/AboutUs/Section/ChangeNumbers')
const ChangeItNumbersBlock = require('../models/AboutUs/Section/ChangeNumberBlock')
const GalleryAdd = require('../models/AboutUs/Section/GalleryAdd')
const NewsHeaderLeft = require('../models/news/header/headerText')
const NewsheaderRight = require('../models/news/header/headerRight')
const TopNews = require('../models/news/section/topNews')
const article = require('../models/news/section/article');
const register = require('../models/auth/auth');
const auth = require('../middleware/auth')

const { validationResult } = require("express-validator");

router.get("/", auth, (req, res, next) => {
    res.render("admin/index", {
        layout: "main",
    });
});

// index page starting

// header

router.get("/index/header-left", auth, async(req, res) => {
    const header = await IndexHeader.find();
    res.render("admin/index/header/headerLeft", {
        title: "Header",
        layout: "main",
        header,
    });
});

router.post("/index/header-left", auth, fileUpload.single("img"), async(req, res) => {
    const db = new IndexHeader({
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin");
});

router.get("/index/header-left-img/:id", auth, async(req, res) => {
    const {
        img
    } = await IndexHeader.findById(req.params.id);
    toDelete(img);
    IndexHeader.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/index/header-left");
        }
    });
});

router.get("/index/header-right", auth, async(req, res) => {
    const header = await IndexHeaderText.find();
    res.render("admin/index/header/headerRight", {
        title: "Header",
        layout: "main",
        header,
    });
});

router.post("/index/header-right", auth, async(req, res) => {
    const header_right = new IndexHeaderText({
        header_text: req.body.header_text,
        header_span: req.body.header_span,
        header_about: req.body.header_about,
    });

    await header_right.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/index/header-right");
        }
    });
});

router.post("/index/header-right/:id", auth, async(req, res) => {
    const Update = {};

    (Update.header_tex = req.body.header_text),
    (Update.header_text = req.body.header_text),
    (Update.header_span = req.body.header_span),
    (Update.header_about = req.body.header_about);

    await IndexHeaderText.findByIdAndUpdate(req.params.id, Update, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/index/header-right");
        }
    });
});

router.get("/index/header-right-course", auth, async(req, res) => {
    const courses = await IndexHeaderCourses.find();
    res.render("admin/index/header/headerCourses", {
        title: "Courses add",
        layout: "main",
        courses,
    });
});

router.post("/index/header-right-course", auth, async(req, res) => {
    const db = (headerCourse = new IndexHeaderCourses({
        header_courses: req.body.header_courses,
    }));
    await db.save();
    res.redirect("/admin/index/header-right-course");
});

router.get("/index/header-right-course/:id", auth, async(req, res) => {
    await IndexHeaderCourses.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/header-right-course");
});

// section

router.get("/index/section-top", auth, async(req, res) => {
    const right = await SectionTopRight.find();
    const left = await SectionTopLeft.find();
    res.render("admin/index/section/sectionTop", {
        title: "ChangeIt-Academy",
        layout: "main",
        left,
        right,
    });
});

router.post("/index/section-top-left", auth, fileUpload.single("img"), async(req, res) => {
    const db = new SectionTopLeft({
        lesson_name: req.body.lesson_name,
        about_the_lesson: req.body.about_the_lesson,
        img: req.file.filename,
        date: moment().format("LTS"),
    });
    await db.save();
    res.redirect("/admin/index/section-top");
});

router.post("/index/section-top-right", auth, fileUpload.single("img_right"), async(req, res) => {
    const db = new SectionTopRight({
        lesson_name_right: req.body.lesson_name_right,
        about_the_lesson_right: req.body.about_the_lesson_right,
        img_right: req.file.filename,
        date: new Date() * 1000,
    });

    await db.save();
    res.redirect("/admin/index/section-top");
});

router.get("/index/sect_top_right/:id", auth, async(req, res) => {
    const {
        img
    } = await SectionTopRight.findById(req.params.id);
    toDelete(img);
    await SectionTopRight.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-top");
});

router.get("/index/sect_top_left/:id", auth, async(req, res) => {
    const {
        img
    } = await SectionTopLeft.findById(req.params.id);
    toDelete(img);
    await SectionTopLeft.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-top");
});
// section privilege

router.get("/index/section-privilege", auth, async(req, res) => {
    const sect_center_left = await SectionCenterLeft.find();
    const sect_center_right = await SectionCenterRight.find();
    res.render("admin/index/section/sectionCenter", {
        title: "ChangeIT-Academy",
        layout: "main",
        sect_center_left,
        sect_center_right,
    });
});

router.post("/index/section-center-img", auth, fileUpload.single("img"), async(req, res) => {
    const db = new SectionCenterLeft({
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-privilege");
});

router.get("/index/sect_center_left/:id", auth, async(req, res) => {
    const { img } = await SectionCenterLeft.findById(req.params.id);
    toDelete(img);
    await SectionCenterLeft.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-privilege");
});

router.post("/index/section-center-right", auth, async(req, res) => {
    const db = new SectionCenterRight({
        name: req.body.name,
        about: req.body.about,
        ul_li_a_1: req.body.ul_li_a_1,
        ul_li_a_2: req.body.ul_li_a_2,
        ul_li_a_3: req.body.ul_li_a_3,
    });
    await db.save();
    res.redirect("/admin/index/section-privilege");
});

router.get("/index/section_center_right/update/:id", auth, async(req, res) => {
    const sectcenterRight = await SectionCenterRight.find();
    res.render("admin/index/section/editDectCenter", {
        title: "ChangeIT-Academy",
        layout: "main",
        sectcenterRight,
    });
});

router.get("/index/section_center_right/delete/:id", auth, async(req, res) => {
    await SectionCenterRight.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-privilege");
});

router.post("/index/section_center_right/update/:id", auth, async(req, res) => {
    const Update = {};

    (Update.name = req.body.name),
    (Update.about = req.body.about),
    (Update.ul_li_a_1 = req.body.ul_li_a_1),
    (Update.ul_li_a_2 = req.body.ul_li_a_2),
    (Update.ul_li_a_3 = req.body.ul_li_a_3);

    await SectionCenterRight.findByIdAndUpdate(req.params.id, Update);

    res.redirect("/admin/index/section-privilege");
});

// direction

router.get("/index/section-direction", auth, async(req, res) => {
    const directions = await sectionDirection.find();
    res.render("admin/index/section/directions", {
        title: "ChangeIT-Academy",
        layout: "main",
        directions,
    });
});

router.post("/index/section_direction", auth, fileUpload.single("img"), async(req, res) => {
    const db = new sectionDirection({
        name: req.body.name,
        month: req.body.month,
        module: req.body.module,
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-direction");
});

router.get("/index/directions/delete/:id", auth, async(req, res) => {
    const { img } = await sectionDirection.findById(req.params.id);
    toDelete(img);
    await sectionDirection.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-direction");
});

// section system

router.get("/index/section-system", auth, async(req, res) => {
    const system = await sectionSystem.find()
    res.render("admin/index/section/sectionSystem", {
        title: "ChangeIT-Academy",
        layout: "main",
        system
    });
});

router.post("/index/section-system", auth, fileUpload.single("img"), async(req, res) => {
    const db = new sectionSystem({
        name: req.body.name,
        about: req.body.about,
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-system");
});

router.get('/index/section-system/delete/:id', auth, async(req, res) => {
    const { img } = await sectionSystem.findById(req.params.id);
    toDelete(img);
    await sectionSystem.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-system')
})

router.get('/index/section-certificate', auth, async(req, res) => {
    const listgroup = await listGroup.find()
    const imgAddMedal = await imgAdd.find()
    const medalimg = await MedalImg.find()
    res.render('admin/index/section/section-certificate', {
        title: 'ChangeIt-Academy',
        layout: 'main',
        listgroup,
        imgAddMedal,
        medalimg
    })
})

router.get('/index/section/list-group/add', auth, (req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIT-Academy",
        layout: 'main',
        add: true

    })
})

router.post('/index/section/list-group', auth, async(req, res) => {
    const db = new listGroup({
        list_group: req.body.list_group,
        tab_pane: req.body.tab_pane,
    })
    await db.save()
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section/list-group/update/:id', auth, async(req, res) => {
    const data = await listGroup.findById(req.params.id)

    res.render('admin/index/section/createList-group', {
        title: "ChangeIT-Academy",
        layout: 'main',
        update: true,
        data
    })

})

router.post('/index/section/list-group/update/:id', auth, async(req, res) => {
    const Update = {}
    Update.list_group = req.body.list_group,
        Update.tab_pane = req.body.tab_pane

    await listGroup.findByIdAndUpdate(req.params.id, Update)

    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section/list-group/delete/:id', auth, async(req, res) => {
    await listGroup.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-medal-img', auth, async(req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIt-Academy",
        imgAdd: true,
        layout: 'main'
    })
})

router.post('/index/section-medal-img', auth, fileUpload.single('img'), async(req, res) => {
    const db = new imgAdd({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-medal/delete/:id', auth, async(req, res) => {
    const { img } = await imgAdd.findById(req.params.id);
    toDelete(img);
    await imgAdd.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-sertifikat-img', auth, async(req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIt-Academy",
        sertifikatImg: true,
        layout: 'main'
    })
})

router.post('/index/section-sertifikat-img', auth, fileUpload.single('img'), async(req, res) => {
    const db = new MedalImg({
        img: req.file.filename
    })
    await db.save()
    res.redirect("/admin/index/section-certificate")
})

router.get('/index/section-sertifikat/delete/:id', auth, async(req, res) => {
    const { img } = await MedalImg.findById(req.params.id);
    toDelete(img);
    await MedalImg.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

// slider Image

router.get('/index/section-slider-img', auth, async(req, res) => {
    const user = await SliderUser.find()
    res.render('admin/index/section/sectionSlider', {
        title: "ChangeIT-Academy",
        layout: 'main',
        user
    })
})

router.get('/index/section-slider-add', auth, async(req, res) => {
    res.render('admin/index/section/sliderAdd', {
        title: "ChangeIT-Academy",
        layout: "main",
        sliderAdddd: true
    })
})

router.post('/index/section-slider-add', auth, fileUpload.single('img'), async(req, res) => {
    const user = new SliderUser({
        name: req.body.name,
        course: req.body.course,
        img: req.file.filename,
        instagram: req.body.instagram,
        telegram: req.body.telegram,
        linkedin: req.body.linkedin,
    })
    await user.save()
    res.redirect('/admin/index/section-slider-img')
})

router.get('/index/slide-user-delete/:id', auth, async(req, res) => {
    const { img } = await SliderUser.findById(req.params.id);
    toDelete(img);
    await SliderUser.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-slider-img')
})

router.get('/index/slide-user-update/:id', auth, async(req, res) => {
    const userUpdate = await SliderUser.findById(req.params.id, (err, data) => {
        res.render('admin/index/section/sliderAdd', {
            title: "ChangeIT-Academy",
            layout: "main",
            slideruserUpdate: true,
            data
        })
    })
})

router.post('/index/section-slider-update/:id', auth, fileUpload.single('img'), async(req, res) => {
    const Update = {}
    Update.name = req.body.name,
        Update.course = req.body.course,
        Update.img = req.file.filename,
        Update.instagram = req.body.instagram,
        Update.telegram = req.body.telegram,
        Update.linkedin = req.body.linkedin

    await SliderUser.findByIdAndUpdate(req.params.id, Update)

    res.redirect('/admin/index/section-slider-img')
})

router.get('/index/section-partners', auth, async(req, res) => {
    const partners = await Partners.find()
    res.render('admin/index/section/partners', {
        title: "ChangeIT-Academy",
        layout: 'main',
        partners
    })
})

router.post('/index/section-partners', auth, fileUpload.single('img'), async(req, res) => {
    const db = new Partners({
        img: req.file.filename,
        href: req.body.href,
    })
    await db.save()
    res.redirect('/admin/index/section-partners')
})

router.get('/index/section-partner/delete/:id', auth, async(req, res) => {
    const { img } = await Partners.findById(req.params.id);
    toDelete(img);
    await Partners.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-partners')
})

// ========================================= AboutUs starting =========================================

router.get('/aboutUs/header-left', auth, async(req, res) => {
    const header = await AboutUsHeaderLeft.find()
    res.render('admin/aboutUs/header/headerLeft', {
        title: "ChangeIT-Academy",
        layout: 'main',
        header
    })
})

router.post('/aboutUs/header-left', auth, fileUpload.single('img'), async(req, res) => {
    const db = new AboutUsHeaderLeft({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/aboutUs/header-left')
})

router.get('/aboutUs/header-left-img/:id', auth, async(req, res) => {
    const { img } = await AboutUsHeaderLeft.findById(req.params.id);
    toDelete(img);
    await AboutUsHeaderLeft.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/header-left')
})

router.get('/aboutUs/header-right', auth, async(req, res) => {
    const textRight = await AboutUsHeaderRight.find()
    res.render('admin/aboutUs/header/headerRight', {
        title: "ChangeIT-Academy",
        layout: 'main',
        textRight
    })
})

router.post('/aboutUs/header-right', auth, async(req, res) => {
    const db = new AboutUsHeaderRight({
        text: req.body.text
    })
    await db.save()
    res.redirect('/admin/aboutUs/header-right')
})

router.get('/aboutUs/headerRight/delete/:id', auth, async(req, res) => {
    await AboutUsHeaderRight.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/header-right')
})

router.get('/aboutUs/headerRight/update/:id', auth, async(req, res) => {
    await AboutUsHeaderRight.findOne((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/aboutUs/header/headerRight', {
                title: "ChangeIT-Academy",
                layout: 'main',
                data
            })
        }
    })
})

router.post('/aboutUs/header-right/:id', auth, async(req, res) => {
    const Update = {}
    Update.text = req.body.text

    await AboutUsHeaderRight.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/aboutUs/header-right')
})

router.get('/aboutUs/section-thisIs', auth, async(req, res) => {
    const thisis = await ThisIs.find()
    const thisisImg = await ThisIsImg.find()
    res.render('admin/aboutUs/section/ThisIs', {
        title: "ChangeIT-Academy",
        layout: 'main',
        thisis,
        thisisImg
    })
})

router.get('/aboutUs/ThisIs/add', auth, async(req, res) => {
    res.render('admin/aboutUs/section/ThisIs', {
        title: "ChangeIT-Academy",
        layout: 'main',
        addd: true
    })
})

router.post('/aboutUs/ThisIs/add', auth, async(req, res) => {
    const db = await ThisIs({
        name: req.body.name,
        about: req.body.about,
    })
    await db.save()
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/ThisIs/update/:id', auth, async(req, res) => {
    ThisIs.findOne((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/aboutUs/section/ThisIs', {
                title: "ChangeIT-Academy",
                layout: 'main',
                addd: true,
                data
            })
        }
    })
})

router.post('/aboutUs/ThisIs/add/:id', auth, async(req, res) => {
    const Update = {}
    Update.name = req.body.name,
        Update.about = req.body.about,

        await ThisIs.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/section-thisIs/imageAdd', auth, async(req, res) => {
    res.render('admin/aboutUs/section/ImageAdd', {
        title: "ChangeIT-Academy",
        layout: 'main',
    })
})

router.post('/aboutUs/section-thisIs/imageAdd', auth, fileUpload.single('img'), async(req, res) => {
    const db = new ThisIsImg({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/section-thisIs/deleteImg/:id', auth, async(req, res) => {
    const { img } = await ThisIsImg.findById(req.params.id);
    toDelete(img);
    await ThisIsImg.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/changeIt-numbers', auth, async(req, res) => {
    const findText = await ChangeItNumbers.find()
    const block = await ChangeItNumbersBlock.find()
    res.render('admin/aboutUs/section/ChangeNumbers', {
        title: "ChangeIT-Academy",
        layout: 'main',
        findText,
        block
    })
})

router.get('/aboutUs/changeNumbers/AddText', auth, async(req, res) => {
    res.render('admin/aboutUs/section/ChangeNumbersEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        addText: true
    })
})

router.post('/aboutUs/changeItNumbers', auth, async(req, res) => {
    const db = new ChangeItNumbers({
        text: req.body.text,
        about: req.body.about,

    })
    await db.save()
    res.redirect('/admin/aboutUs/changeIt-numbers')
})

router.get('/aboutUs/changeNumbers/AddText/edit/:id', auth, async(req, res) => {
    const findText = await ChangeItNumbers.findOne()
    res.render('admin/aboutUs/section/ChangeNumbersEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        update: true,
        findText
    })
})

router.post('/aboutUs/changeItNumbers/:id', auth, async(req, res) => {
    const Update = {}
    Update.text = req.body.text,
        Update.about = req.body.about

    await ChangeItNumbers.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/aboutUs/changeIt-numbers')
})

router.get('/aboutUs/changeNumbers/AddText/delete/:id', auth, async(req, res) => {
    await ChangeItNumbers.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/changeIt-numbers')
})

router.get('/aboutUs/changeNumbers-block', auth, async(req, res) => {
    res.render('admin/aboutUs/section/ChangeNumbersEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        NumberAdd: true,
    })
})

router.post('/aboutUs/AddNumber', auth, async(req, res) => {
    const db = new ChangeItNumbersBlock({
        number: req.body.number,
        about: req.body.about,
    })
    await db.save()
    res.redirect('/admin/aboutUs/changeIt-numbers')
})

router.get('/aboutUs/blockEdit/:id', auth, async(req, res) => {
    await ChangeItNumbersBlock.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/changeIt-numbers')
})

router.get('/aboutUs/changeIt-gallery', auth, async(req, res) => {
    const gallery = await GalleryAdd.find()
    res.render('admin/aboutUs/section/Gallery', {
        title: "ChangeIT-Academy",
        layout: 'main',
        gallery
    })
})

router.get('/aboutUs/changeIt-gallery/Add', auth, async(req, res) => {
    res.render('admin/aboutUs/section/GalleryAdd', {
        title: "ChangeIT-Academy",
        layout: 'main',
    })
})

router.post('/aboutUs/changeIt-gallery/Add', auth, fileUpload.single('img'), async(req, res) => {
    const db = new GalleryAdd({
        img: req.file.filename,
        text: req.body.text,
    })
    await db.save()
    res.redirect('/admin/aboutUs/changeIt-gallery')
})

router.get('/aboutUs/changeIt-gallery/delete/:id', auth, async(req, res) => {
    const { img } = await GalleryAdd.findById(req.params.id);
    toDelete(img);
    await GalleryAdd.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/changeIt-gallery')
})

// ============================================ news page

router.get('/news/header', auth, async(req, res) => {
    const left = await NewsHeaderLeft.find()
    const right = await NewsheaderRight.find()
    res.render('admin/news/header', {
        title: "ChangeIT-Academy",
        layout: 'main',
        left,
        right
    })
})

router.get('/news/header/left/add', auth, async(req, res) => {
    res.render('admin/news/headerEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        add: true
    })
})

router.post('/news/headerLeft', auth, async(req, res) => {
    const db = new NewsHeaderLeft({
        text: req.body.text
    })
    await db.save()
    res.redirect('/admin/news/header')
})

router.get('/news/header/left/delete/:id', auth, async(req, res) => {
    await NewsHeaderLeft.findByIdAndDelete(req.params.id)
    res.redirect('/admin/news/header')
})

router.get('/news/header/left/edit/:id', auth, async(req, res) => {
    const editText = await NewsHeaderLeft.findOne()
    res.render('admin/news/headerEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        edit: true,
        editText
    })
})

router.post('/news/headerLeft/edit/:id', auth, async(req, res) => {
    const Update = {}
    Update.text = req.body.text

    await NewsHeaderLeft.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/news/header')
})

router.get('/news/header/right/add', auth, async(req, res) => {
    res.render('admin/news/headerEdit', {
        title: "ChangeIT-Academy",
        layout: 'main',
        image: true
    })
})

router.post('/news/headerRight/add', auth, fileUpload.single('img'), async(req, res) => {
    const db = new NewsheaderRight({
        img: req.file.filename
    })
    await db.save()

    res.redirect('/admin/news/header')
})

router.get('/news/header/right/delete/:id', auth, async(req, res) => {
    const { img } = await NewsheaderRight.findById(req.params.id);
    toDelete(img);
    await NewsheaderRight.findByIdAndDelete(req.params.id)
    res.redirect('/admin/news/header')
})

router.get('/news/top-news', auth, async(req, res) => {
    const news = await TopNews
        .find({})
        .sort({
            img: -1,
        })
        .limit(7)
    const newsTop = await TopNews
        .find({})
        .sort({
            img: -1,
        })
        .limit(1)
    res.render('admin/news/topNews', {
        title: "ChangeIT-Academy",
        layout: 'main',
        news,
        newsTop
    })
})

router.get('/news/top-news/add-delete', auth, async(req, res) => {
    const news = await TopNews
        .find({})

    if (news.length > 7) {
        const news = await TopNews
            .find({})
            .sort({
                _id: 1
            })
            .limit(1)
        console.log(news);
        const { img } = await TopNews.findById(news);
        toDelete(img);
        await TopNews.findByIdAndDelete(news, (err, data) => {
            if (err) {
                res.redirect('/')
            } else {
                res.render('admin/news/topNewsAdd', {
                    title: "ChangeIT-Academy",
                    layout: 'main',
                    add: true
                })
            }
        })
    } else {
        res.render('admin/news/topNewsAdd', {
            title: "ChangeIT-Academy",
            layout: 'main',
            add: true
        })
    }


})

router.get('/news/top-news/add', auth, async(req, res) => {
    res.render('admin/news/topNewsAdd', {
        title: "ChangeIT-Academy",
        layout: 'main',
        add: true
    })
})

router.post('/news/news/add', auth, fileUpload.single('img'), async(req, res) => {
    const db = new TopNews({
        img: req.file.filename,
        title: req.body.title,
        more: req.body.more,
        data: moment().format('L'),
    })
    await db.save()
    res.redirect('/admin/news/top-news')
})

router.get('/news/news/delete/:id', auth, async(req, res) => {
    const { img } = await TopNews.findById(req.params.id);
    toDelete(img);
    await TopNews.findByIdAndDelete(req.params.id)
    res.redirect('/admin/news/top-news')
})

router.get('/all/news/content', async(req, res) => {
    const topNews = await TopNews.find();
    res.status(200).json(topNews)
})

router.get('/news/news/update/:id', auth, async(req, res) => {
    const NewsUpdate = await TopNews.findOne()
    res.render('admin/news/topNewsAdd', {
        title: "ChangeIT-Academy",
        layout: 'main',
        update: true,
        NewsUpdate
    })
})

router.post('/news/news/update/:id', auth, fileUpload.single('img'), async(req, res) => {
    const { img } = await TopNews.findById(req.params.id);
    toDelete(img);
    const Update = {}
    Update.title = req.body.title,
        Update.more = req.body.more,
        Update.img = req.file.filename

    await TopNews.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/news/top-news')
})

router.get('/news/article', auth, async(req, res) => {
    const articleFind = await article
        .find()
        .sort({
            img: -1,
        })
        // .limit(3)
    res.render('admin/news/article', {
        title: "ChangeIT-Academy",
        layout: 'main',
        articleFind
    })
})

router.get('/news/article/add', auth, async(req, res) => {
    const news = await article.find({})

    if (news.length > 17) {
        const news = await article
            .find({})
            .sort({
                _id: 1
            })
            .limit(1)
        console.log(news);
        const { img } = await article.findById(news);
        toDelete(img);
        await article.findByIdAndDelete(news, (err, data) => {
            if (err) {
                res.redirect('/')
            } else {
                res.render('admin/news/articleAdd', {
                    title: 'ChangeIT-Academy',
                    layout: 'main'
                })
            }
        })
    } else {
        res.render('admin/news/articleAdd', {
            title: 'ChangeIT-Academy',
            layout: 'main'
        })
    }

})

router.post('/news/article/add', auth, fileUpload.single('img'), async(req, res) => {
    const db = new article({
        title: req.body.title,
        about: req.body.about,
        img: req.file.filename,
        data: moment().format('LL')
    })
    await db.save()
    res.redirect('/admin/news/article')
})

router.get('/all/news/artcle', auth, async(req, res) => {
    const topNews = await article.find();
    res.status(200).json(topNews)
})

router.get('/article/again', auth, async(req, res) => {
    const articlee = await article.find();
    res.status(200).json(articlee)
})

router.get('/news/article/delete/:id', auth, async(req, res) => {
    const { img } = await article.findById(req.params.id);
    toDelete(img);
    await article.findByIdAndDelete(req.params.id)
    res.redirect('/admin/news/article')
})


router.get('/auth/register', auth, async(req, res) => {
    res.render('admin/auth/register', {
        title: "ChangeIT-Academy",
    })
})


router.post("/auth/register", async(req, res) => {
    try {
        const { email, password } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).redirect("/admin/auth/register");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new register({
            email,
            password: hashPassword
        });
        await user.save();
        res.redirect("/admin/auth/login");
    } catch (e) {
        res.redirect('/')
    }
});

router.get('/auth/login', async(req, res) => {
    res.render('admin/auth/login', {
        title: "ChangeIT-Academy",
    })
})


router.post("/auth/login", async(req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await register.findOne({ email });

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            console.log(areSame);
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save((err) => {
                    if (err) {
                        throw err;
                    }
                    res.redirect("/admin");
                });
            } else {
                res.redirect("/admin");
            }
        } else {
            res.redirect("/");
        }
    } catch (e) {
        console.log(e);
    }
});

router.get('/logout', auth, async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;