const express = require("express");
const Header = require("../models/Index/HeaderImg");
const HeaderText = require("../models/Index/HeaderText");
const HeaderCourse = require("../models/Index/headerCourses");
const toDelete = require("../middleware/toDelete");
const SectionTopLeft = require("../models/Index/SectionTopLeft");
const SectionTopRight = require("../models/Index/SectionTopRight");
const sectionCenterLeft = require("../models/Index/sectionCenterLeft");
const sectionCenterRight = require("../models/Index/sectionCenterRight");
const sectDirections = require("../models/Index/sectDirections");
const sectionSystem = require("../models/Index/sectionSystem");
const listGroup = require('../models/Index/certificatListgroup')
const imgMedal = require('../models/Index/sectionMedalImg')
const SertifikatImg = require('../models/Index/sertifikatImg')
const SliderUser = require('../models/Index/SliderUser')
const Partners = require('../models/Index/partner-img')
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
    const header = await Header.find();
    const headertext = await HeaderText.find();
    const courses = await HeaderCourse.find();
    const SectTopLeft = await SectionTopLeft.find();
    const SectTopRight = await SectionTopRight.find();
    const sectCenterLeft = await sectionCenterLeft.find();
    const sectCenterRight = await sectionCenterRight.find();
    const directions = await sectDirections.find();
    const system = await sectionSystem.find();
    const listgroup = await listGroup.find();
    const imgAddMedal = await imgMedal.find();
    const medalimg = await SertifikatImg.find();
    const user = await SliderUser.find()
    const partners = await Partners.find()
    const arr = [...SectTopLeft, ...SectTopRight]

    const result = arr.sort((a, b) => a.date - b.date)

    res.render("pages/index", {
        title: "Change IT-Academy",
        header,
        headertext,
        courses,
        // SectTopLeft,
        // SectTopRight,
        result,
        sectCenterLeft,
        sectCenterRight,
        directions,
        system,
        listgroup,
        imgAddMedal,
        medalimg,
        user,
        partners
    });
});

module.exports = router;