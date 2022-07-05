// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');


// const userSchema = new mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: [ true, 'please provide  name' ],
// 		minlength: 3,
// 		maxlength: 50
// 	},
// 	email: {
// 		type: String,
// 		required: [ true, 'please provide  email' ],
// 		unique: true,
// 		match: [
// 			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
// 			'Please provide a valid email'
// 		]
// 	},
// 	password: {
// 		type: String,
// 		required: [ true, 'please provide password' ],
// 		minlength: 6
// 	}
// });

// // userSchema.pre('save', async function() {
// // 	const salt = bcrypt.genSalt(10);
// // 	this.password = bcrypt.hash(this.password, salt);
// // });
// userSchema.pre('save', async function() {
// 	const salt = await bcrypt.genSalt(10);
// 	const tempPassword = await bcrypt.hash(this.password, salt);
// 	this.password = tempPassword;
// });

// userSchema.methods.createJWT = function() {
// 	return jwt.sign({ userId: this._id, name: this.name }, "@McQfThWmZq4t7w!z%C*F-JaNdRgUkXn",{
// 		expiresIn: "30d"
// 	});
// };

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please provide name' ],
		maxlength: 50,
		minlength: 3
	},
	email: {
		type: String,
		required: [ true, 'Please provide email' ],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email'
		],
		unique: true
	},
	password: {
		type: String,
		required: [ true, 'Please provide password' ],
		minlength: 6
	}
});

UserSchema.pre('save', async function() {
	const salt = await bcrypt.genSalt(10);
	const tempPassword = await bcrypt.hash(this.password, salt);
	this.password = tempPassword;
});

UserSchema.methods.createJWT = function() {
	return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME
	});
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};


module.exports = mongoose.model('User', UserSchema);
