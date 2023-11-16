const express = require('express')
const news = require('#/controllers/news/news')
const newsCategories = require('#controllers/news/newsCatgories')
const { resJson_success, resJson_fail } = require('#/utils/response')

const path = '/news'
const router = express.Router()

router
.post('/add', async (req, res) => {
  try {
    await news.createOne(req.body)
    resJson_success(res, '添加新闻成功')
  } catch (error) {
    resJson_fail(res, '添加新闻失败', error)
  }
})
.get('/get/:id', async (req, res) => {
  try {
    const rsl = await news.getOne({_id: req.params.id})
    resJson_success(res, '获取新闻成功', rsl)
  } catch (error) {
    resJson_fail(res, '获取新闻失败', error)
  }
})
.patch('/update/:id', async (req, res) => {
  try {
    await news.updateOne({_id: req.params.id, ...req.body})
    resJson_success(res, '更新新闻成功')
  } catch (error) {
    resJson_fail(res, '更新新闻失败', error)
  }
})
.delete('/delete/:id', async (req, res) => {
  try {
    await news.deleteOne({_id: req.params.id})
    resJson_success(res, '删除新闻成功')
  } catch (error) {
    resJson_fail(res, '删除新闻失败', error)
  }
})
.get('/list/:userId/:page/:limit', async (req, res) => {
  try {
    const data = await news.getList_user(req.params)
    resJson_success(res, '获取新闻列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻列表失败', error)
  }
})
.get('/drafts/list/:userId/:page/:limit', async (req, res) => {
  try {
    const data = await news.getDraftList_user(req.params)
    resJson_success(res, '获取新闻草稿列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻草稿列表失败', error)
  }
})
.get('/auditing/list/:page/:limit', async (req, res) => {
  try {
    const data = await news.getAuditingList(req.params)
    resJson_success(res, '获取【审核中】新闻列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取【审核中】新闻列表失败', error)
  }
})
.get('/audit/list/:userId/:page/:limit', async (req, res) => {
  try {
    const data = await news.getAuditList_user(req.params)
    resJson_success(res, '获取新闻审核列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻审核列表失败', error)
  }
})
.get('/publish/list/:userId/:state/:page/:limit', async (req, res) => {
  try {
    const data = await news.getPublishList_user_publishState({...req.params, publishState: req.params.state})
    resJson_success(res, '获取新闻发布列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻发布列表失败', error)
  }
})
.get('/published', async (req, res) => {
  try {
    const rsl = await news.getPublished({_id: req.params.id})
    resJson_success(res, '获取已发布新闻成功', rsl)
  } catch (error) {
    resJson_fail(res, '获取已发布新闻失败', error)
  }
})

.get('/categories', async (req, res) => {
  try {
    const data = await newsCategories.get()
    resJson_success(res, '获取新闻分类成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻分类失败', error)
  }
})
.post('/categories/add', async (req, res) => {
  try {
    await newsCategories.createOne(req.body)
    resJson_success(res, '添加新闻分类成功')
  } catch (error) {
    resJson_fail(res, '添加新闻分类失败', error)
  }
})
.get('/categories/list/:page/:limit', async (req, res) => {
  try {
    const data = await newsCategories.getList(req.params)
    resJson_success(res, '获取新闻分类列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取新闻分类列表失败', error)
  }
})
.patch('/categories/update/:id', async (req, res) => {
  try {
    const {id} = req.params
    await newsCategories.updateOne({_id: id, ...req.body})
    resJson_success(res, '更新新闻分类成功')
  } catch (error) {
    resJson_fail(res, '更新新闻分类失败', error)
  }
})
.delete('/categories/delete/:id', async (req, res) => {
  try {
    const {id} = req.params
    await newsCategories.deleteOne({_id: id})
    resJson_success(res, '删除新闻分类成功')
  } catch (error) {
    resJson_fail(res, '删除新闻分类失败', error)
  }
})

module.exports = {path, router}