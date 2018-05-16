module.exports = MainSevice

function MainSevice(app) {
    //建築列表
    app.get("/user/login", function(req, res) {
        console.log("/user/login")
        res.status(200).send("data")
    })
}