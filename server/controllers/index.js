const main = (req, res) => {
    res.render('index');
};
const front = (req, res) => {
    res.render('front')
};
const back = (req, res) => {
    res.render('back')
};
const des = (req, res) => {
    res.render('design')
};
const form = (req, res) => {
    res.render('form')
};
module.exports = {main, front, back, des, form};