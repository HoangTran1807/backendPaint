
class userController {
    async Login(req, res){
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid username"
                });
            }
            // mã hóa mật khẩu bằng bcrypt
            const password = await bcrypt.compare(req.body.password, user.password);
            if (!password) {
                return res.status(400).json({
                    status: "error",
                    message: "Invalid password"
                });
            }
            // tạo token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).json({
                status: "success",
                data: token
            });

        }
        catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }

    async Register(req, res){
        try {
            // mã hóa mật khẩu bằng bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                role: req.body.role,
            });
            await user.save();
            res.json({
                status: "success",
                data: user
            });
        }
        catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }

    async LoginByGoogle(req, res){
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                const user = new User({
                    username: req.body.name,
                    email: req.body.email,
                    role: 'user',
                });
                await user.save();
            }
            // tạo token
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).json({
                status: "success",
                data: token
            });
        }
        catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }


    async isAdmin(req, res){
        try {
            const token = req.header('auth-token');
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findOne({ _id: decoded._id });
            if (user.role === 'admin') {
                res.json({
                    status: "success",
                    data: true
                });
            } else {
                res.json({
                    status: "success",
                    data: false
                });
            }
        }
        catch (error) {
            res.status(400).json({
                status: "error",
                message: error.message
            });
        }
    }



}