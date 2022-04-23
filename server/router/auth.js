const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const Plan = require('../models/planSchema');
const router = express.Router();

router.post('/register', async (req, resp) => {
    const { name, email, phone, work, cpassword, password, isPlanActive, currentPlan, balance } = req.body;

    if (!name || !email || !phone || !work || !cpassword || !password) {
        return resp.status(422).json({ error: "Invalid Details" })
    }

    try {

        const user = new User({ name, email, phone, work, cpassword, password, isPlanActive, currentPlan, balance });

        let isUserPresent = await User.findOne({ email: email });

        if (isUserPresent) {
            return resp.status(422).json({ error: "Invalid Details Present" });
        } else if (password != cpassword) {
            return resp.status(422).json({ error: "Password not matching" });
        }

        user.save();

        return resp.json({ message: "Success" })

    } catch (e) {
        return resp.json({ error: e })
    }
});

router.post('/signin', async (req, resp) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return resp.status(422).json({ error: "Invalid Details !!", status: 422 })
    }
    try {
        let isUserPresent = await User.findOne({ name: name });

        if (!isUserPresent) {
            return resp.json({ error: "Invalid Details Present !!", status: 422 });
        }

        let isMatch = await bcrypt.compare(password, isUserPresent.password);

        if (!isMatch) {
            return resp.status(422).json({ error: "Invalid Details Present", status: 422 });
        }
        let token = await isUserPresent.generateAuthToken();
        resp.cookie('jwttoken', token, {
            expires: new Date(Date.now() + 200000),
            httpOnly: true
        });
        resp.json({ msg: "SIGN IN SUCCESSFFUL" });
    } catch (err) {
        return resp.json({ error: err, status: 422 });
    }
});

router.post('/getUsers', async (req, resp) => {
    try {
        const userList = await User.find();
        resp.json(userList);

    } catch (err) {
        return resp.json({ error: err, status: 422 });
    }
});

router.post('/getPlans', async (req, resp) => {
    try {
        const planList = await Plan.find();
        resp.json(planList);

    } catch (err) {
        return resp.json({ error: err, status: 422 });
    }
});

router.post('/setUserPlan', async (req, resp) => {
    try {
        const { userId, planId } = req.body;

        if (!userId || !planId) {
            return resp.status(422).json({ error: "Invalid Details !!", status: 422 })
        }

        let user = await User.findOne({ _id: userId });

        let plan = await Plan.findOne({ _id: planId });

        let balance = user.balance - plan.price;
        
        if(balance < 0){
            return resp.status(422).json({ error: "Insufficient balance !!", status: 422 });
        }

        if(user.isPlanActive){
            return resp.status(422).json({ error: "User already substribed a plan !!", status: 422 });
        }

        User.findByIdAndUpdate(userId,
            {
                $set: {
                    isPlanActive: true,
                    currentPlan: planId
                }
            });
        return resp.json({msg:"User successfully subscribed !!"});
    } catch (err) {
        return resp.json({ error: err, status: 422 });
    }
});

router.post('/getActiveUser', async (req, resp) => {
    try {
        let userList = await User.aggregate([
            {
                $lookup:
                {
                    from: 'plans',
                    localField: 'currentPlan',
                    foreignField: '_id',
                    as: 'planData'
                }

            },
            {
                $unwind: "$planData"
            }/*
            {
                $project: {
                    _id: 1,
                    planName: "$planData.name"
                }
            }*/
        ]);

        return resp.json(userList);

    } catch (err) {
        return resp.json({ error: err, status: 422 });
    }
});

router.post('/logout', (req, resp) => {
    resp.clearCookie('jwttoken', { path: '/' })
    resp.send('Hello World from about');
});


module.exports = router;