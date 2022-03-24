const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/auth");

const  {getAllTags,createTag, updateTag,deleteTag,createMutipleTags}= require('../controllers/tag')


router.get("/", getAllTags);

// router.get("/tags/:tagId", getTag);

router.post("/new",checkAuth, createTag);

router.post("/multiple/new",checkAuth, createMutipleTags);

router.patch("/:id",checkAuth, updateTag);

router.patch("/delete/:id",checkAuth, deleteTag);

module.exports = router;