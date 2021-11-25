const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const fileMiddleware = require("../middleware/fileUpload");
const toDelete = require("../middleware/toDelete");
const moment = require("moment");
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

router.get("/", (req, res, next) => {
    res.render("admin/index", {
        layout: "main",
    });
});

// index page starting

// header

router.get("/index/header-left", async (req, res) => {
    const header = await IndexHeader.find();
    res.render("admin/index/header/headerLeft", {
        title: "Header",
        layout: "main",
        header,
    });
});

router.post(
    "/index/header-left",
    fileUpload.single("img"),
    async (req, res) => {
        const db = new IndexHeader({
            img: req.file.filename,
        });
        await db.save();
        res.redirect("/admin");
    }
);

router.get("/index/header-left-img/:id", async (req, res) => {
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

router.get("/index/header-right", async (req, res) => {
    const header = await IndexHeaderText.find();
    res.render("admin/index/header/headerRight", {
        title: "Header",
        layout: "main",
        header,
    });
});

router.post("/index/header-right", async (req, res) => {
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

router.post("/index/header-right/:id", async (req, res) => {
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

router.get("/index/header-right-course", async (req, res) => {
    const courses = await IndexHeaderCourses.find();
    res.render("admin/index/header/headerCourses", {
        title: "Courses add",
        layout: "main",
        courses,
    });
});

router.post("/index/header-right-course", async (req, res) => {
    const db = (headerCourse = new IndexHeaderCourses({
        header_courses: req.body.header_courses,
    }));
    await db.save();
    res.redirect("/admin/index/header-right-course");
});

router.get("/index/header-right-course/:id", async (req, res) => {
    await IndexHeaderCourses.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/header-right-course");
});

// section

router.get("/index/section-top", async (req, res) => {
    const right = await SectionTopRight.find();
    const left = await SectionTopLeft.find();
    res.render("admin/index/section/sectionTop", {
        title: "ChangeIt-Academy",
        layout: "main",
        left,
        right,
    });
});

router.post("/index/section-top-left", fileUpload.single("img"), async (req, res) => {
    const db = new SectionTopLeft({
        lesson_name: req.body.lesson_name,
        about_the_lesson: req.body.about_the_lesson,
        img: req.file.filename,
        date: moment().format("LTS"),
    });
    await db.save();
    res.redirect("/admin/index/section-top");
});

router.post("/index/section-top-right", fileUpload.single("img_right"), async (req, res) => {
    const db = new SectionTopRight({
        lesson_name_right: req.body.lesson_name_right,
        about_the_lesson_right: req.body.about_the_lesson_right,
        img_right: req.file.filename,
        date: new Date() * 1000,
    });

    await db.save();
    res.redirect("/admin/index/section-top");
});

router.get("/index/sect_top_right/:id", async (req, res) => {
    const {
        img
    } = await SectionTopRight.findById(req.params.id);
    toDelete(img);
    await SectionTopRight.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-top");
});

router.get("/index/sect_top_left/:id", async (req, res) => {
    const {
        img
    } = await SectionTopLeft.findById(req.params.id);
    toDelete(img);
    await SectionTopLeft.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-top");
});
// section privilege

router.get("/index/section-privilege", async (req, res) => {
    const sect_center_left = await SectionCenterLeft.find();
    const sect_center_right = await SectionCenterRight.find();
    res.render("admin/index/section/sectionCenter", {
        title: "ChangeIT-Academy",
        layout: "main",
        sect_center_left,
        sect_center_right,
    });
});

router.post("/index/section-center-img", fileUpload.single("img"), async (req, res) => {
    const db = new SectionCenterLeft({
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-privilege");
});

router.get("/index/sect_center_left/:id", async (req, res) => {
    const { img } = await SectionCenterLeft.findById(req.params.id);
    toDelete(img);
    await SectionCenterLeft.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-privilege");
});

router.post("/index/section-center-right", async (req, res) => {
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

router.get("/index/section_center_right/update/:id", async (req, res) => {
    const sectcenterRight = await SectionCenterRight.find();
    res.render("admin/index/section/editDectCenter", {
        title: "ChangeIT-Academy",
        layout: "main",
        sectcenterRight,
    });
});

router.get("/index/section_center_right/delete/:id", async (req, res) => {
    await SectionCenterRight.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-privilege");
});

router.post("/index/section_center_right/update/:id", async (req, res) => {
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

router.get("/index/section-direction", async (req, res) => {
    const directions = await sectionDirection.find();
    res.render("admin/index/section/directions", {
        title: "ChangeIT-Academy",
        layout: "main",
        directions,
    });
});

router.post("/index/section_direction", fileUpload.single("img"), async (req, res) => {
    const db = new sectionDirection({
        name: req.body.name,
        month: req.body.month,
        module: req.body.module,
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-direction");
});

router.get("/index/directions/delete/:id", async (req, res) => {
    const { img } = await sectionDirection.findById(req.params.id);
    toDelete(img);
    await sectionDirection.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index/section-direction");
});

// section system

router.get("/index/section-system", async (req, res) => {
    const system = await sectionSystem.find()
    res.render("admin/index/section/sectionSystem", {
        title: "ChangeIT-Academy",
        layout: "main",
        system
    });
});

router.post("/index/section-system", fileUpload.single("img"), async (req, res) => {
    const db = new sectionSystem({
        name: req.body.name,
        about: req.body.about,
        img: req.file.filename,
    });
    await db.save();
    res.redirect("/admin/index/section-system");
});

router.get('/index/section-system/delete/:id', async (req, res) => {
    const { img } = await sectionSystem.findById(req.params.id);
    toDelete(img);
    await sectionSystem.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-system')
})

router.get('/index/section-certificate', async (req, res) => {
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

router.get('/index/section/list-group/add', (req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIT-Academy",
        layout: 'main',
        add: true

    })
})

router.post('/index/section/list-group', async (req, res) => {
    const db = new listGroup({
        list_group: req.body.list_group,
        tab_pane: req.body.tab_pane,
    })
    await db.save()
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section/list-group/update/:id', async (req, res) => {
    const data = await listGroup.findById(req.params.id)

    res.render('admin/index/section/createList-group', {
        title: "ChangeIT-Academy",
        layout: 'main',
        update: true,
        data
    })

})

router.post('/index/section/list-group/update/:id', async (req, res) => {
    const Update = {}
    Update.list_group = req.body.list_group,
        Update.tab_pane = req.body.tab_pane

    await listGroup.findByIdAndUpdate(req.params.id, Update)

    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section/list-group/delete/:id', async (req, res) => {
    await listGroup.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-medal-img', async (req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIt-Academy",
        imgAdd: true,
        layout: 'main'
    })
})

router.post('/index/section-medal-img', fileUpload.single('img'), async (req, res) => {
    const db = new imgAdd({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-medal/delete/:id', async (req, res) => {
    const { img } = await imgAdd.findById(req.params.id);
    toDelete(img);
    await imgAdd.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

router.get('/index/section-sertifikat-img', async (req, res) => {
    res.render('admin/index/section/createList-group', {
        title: "ChangeIt-Academy",
        sertifikatImg: true,
        layout: 'main'
    })
})

router.post('/index/section-sertifikat-img', fileUpload.single('img'), async (req, res) => {
    const db = new MedalImg({
        img: req.file.filename
    })
    await db.save()
    res.redirect("/admin/index/section-certificate")
})

router.get('/index/section-sertifikat/delete/:id', async (req, res) => {
    const { img } = await MedalImg.findById(req.params.id);
    toDelete(img);
    await MedalImg.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-certificate')
})

// slider Image

router.get('/index/section-slider-img', async (req, res) => {
    const user = await SliderUser.find()
    res.render('admin/index/section/sectionSlider', {
        title: "ChangeIT-Academy",
        layout: 'main',
        user
    })
})

router.get('/index/section-slider-add', async (req, res) => {
    res.render('admin/index/section/sliderAdd', {
        title: "ChangeIT-Academy",
        layout: "main",
        sliderAdddd: true
    })
})

router.post('/index/section-slider-add', fileUpload.single('img'), async (req, res) => {
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

router.get('/index/slide-user-delete/:id', async (req, res) => {
    const { img } = await SliderUser.findById(req.params.id);
    toDelete(img);
    await SliderUser.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-slider-img')
})

router.get('/index/slide-user-update/:id', async (req, res) => {
    const userUpdate = await SliderUser.findById(req.params.id, (err, data) => {
        res.render('admin/index/section/sliderAdd', {
            title: "ChangeIT-Academy",
            layout: "main",
            slideruserUpdate: true,
            data
        })
    })
})

router.post('/index/section-slider-update/:id', fileUpload.single('img'), async (req, res) => {
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

router.get('/index/section-partners', async (req, res) => {
    const partners = await Partners.find()
    res.render('admin/index/section/partners', {
        title: "ChangeIT-Academy",
        layout: 'main',
        partners
    })
})

router.post('/index/section-partners', fileUpload.single('img'), async (req, res) => {
    const db = new Partners({
        img: req.file.filename,
        href: req.body.href,
    })
    await db.save()
    res.redirect('/admin/index/section-partners')
})

router.get('/index/section-partner/delete/:id', async (req, res) => {
    const { img } = await Partners.findById(req.params.id);
    toDelete(img);
    await Partners.findByIdAndDelete(req.params.id)
    res.redirect('/admin/index/section-partners')
})













// ========================================= AboutUs starting =========================================







router.get('/aboutUs/header-left', async (req, res) => {
    const header = await AboutUsHeaderLeft.find()
    res.render('admin/aboutUs/header/headerLeft', {
        title: "ChangeIT-Academy",
        layout: 'main',
        header
    })
})

router.post('/aboutUs/header-left', fileUpload.single('img'), async (req, res) => {
    const db = new AboutUsHeaderLeft({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/aboutUs/header-left')
})

router.get('/aboutUs/header-left-img/:id', async (req, res) => {
    const { img } = await AboutUsHeaderLeft.findById(req.params.id);
    toDelete(img);
    await AboutUsHeaderLeft.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/header-left')
})


router.get('/aboutUs/header-right', async (req, res) => {
    const textRight = await AboutUsHeaderRight.find()
    res.render('admin/aboutUs/header/headerRight', {
        title: "ChangeIT-Academy",
        layout: 'main',
        textRight
    })
})


router.post('/aboutUs/header-right', async (req, res) => {
    const db = new AboutUsHeaderRight({
        text: req.body.text
    })
    await db.save()
    res.redirect('/admin/aboutUs/header-right')
})


router.get('/aboutUs/headerRight/delete/:id', async (req, res) => {
    await AboutUsHeaderRight.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/header-right')
})

router.get('/aboutUs/headerRight/update/:id', async (req, res) => {
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

router.post('/aboutUs/header-right/:id', async (req, res) => {
    const Update = {}
    Update.text = req.body.text

    await AboutUsHeaderRight.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/aboutUs/header-right')
})


router.get('/aboutUs/section-thisIs', async (req, res) => {
    const thisis = await ThisIs.find()
    const thisisImg = await ThisIsImg.find()
    res.render('admin/aboutUs/section/ThisIs', {
        title: "ChangeIT-Academy",
        layout: 'main',
        thisis,
        thisisImg
    })
})

router.get('/aboutUs/ThisIs/add', async (req, res) => {
    res.render('admin/aboutUs/section/ThisIs', {
        title: "ChangeIT-Academy",
        layout: 'main',
        addd: true
    })
})

router.post('/aboutUs/ThisIs/add', async (req, res) => {
    const db = await ThisIs({
        name: req.body.name,
        about: req.body.about,
    })
    await db.save()
    res.redirect('/admin/aboutUs/section-thisIs')
})
//ThisIs


router.get('/aboutUs/ThisIs/update/:id', async (req, res) => {
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


router.post('/aboutUs/ThisIs/add/:id', async (req, res) => {
    const Update = {}
    Update.name = req.body.name,
        Update.about = req.body.about,

        await ThisIs.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/section-thisIs/imageAdd', async (req, res) => {
    res.render('admin/aboutUs/section/ImageAdd', {
        title: "ChangeIT-Academy",
        layout: 'main',
    })
})

router.post('/aboutUs/section-thisIs/imageAdd', fileUpload.single('img'), async (req, res) => {
    const db = new ThisIsImg({
        img: req.file.filename
    })
    await db.save()
    res.redirect('/admin/aboutUs/section-thisIs')
})

router.get('/aboutUs/section-thisIs/deleteImg/:id', async (req, res) => {
    const { img } = await ThisIsImg.findById(req.params.id);
    toDelete(img);
    await ThisIsImg.findByIdAndDelete(req.params.id)
    res.redirect('/admin/aboutUs/section-thisIs')
})


module.exports = router;