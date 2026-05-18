const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// hash password
userSchema.pre("save", async function () {
        if (this.isNew || this.isModified("password")) {
            const hashPassword = await bcrypt.hash(this.password, 10);
            this.password = hashPassword;
        }
    });

// register user
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

// compare hashed passwords
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }


}

// login
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });

        if (!user) {
            throw new Error("incorrect username/password")
        }

        const isPasswordMatch = await user.comparePassword(password);

        // incorrect?
        if (!isPasswordMatch) {
            throw new Error("incorrect username/password");
        }

        // correct
        return user;

    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;