module.exports = (container) => {
    const { schemas } = container.resolve('models')
    const { User } = schemas
    const addUser = (cata) => {
        const ca = new User(cata)
        return ca.save()
    }
    const getUserById = (id) => {
        return User.findById(id)
    }
    const deleteUser = (id) => {
        return User.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const deletedUser = (id) => {
        return User.findByIdAndUpdate(id, { deleted: 1 }, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const updateUser = (id, n) => {
        return User.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return User.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return User.countDocuments(pipe)
    }
    const getUserAgg = (pipe) => {
        return User.aggregate(pipe)
    }
    const getUser = (pipe, limit, skip, sort) => {
        return User.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getUserNoPaging = (pipe) => {
        return User.find(pipe)
    }
    const removeUser = (pipe) => {
        return User.deleteMany(pipe)
    }
    const findOne = (pipe) => {
        return User.findOne(pipe)
    }
    const updateMany = (pipe, value) => {
        return User.updateMany(pipe, value)
    }
    const updateOne = (pipe, value) => {
        return User.updateOne(pipe, value)
    }
    const find = (pipe) => {
        return User.find(pipe)
    }
    const bulkWrite = (arr) => {
        return User.bulkWrite(arr)
    }
    const getUserByUsername = username => {
        return User.findOne({ username }).select('-password')
    }
    const login = ({
                       username,
                       password
                   }) => {
        return User.findOne({
            username,
            password
        }).select('-password')
    }
    return {
        addUser,
        getUserById,
        deleteUser,
        deletedUser,
        updateUser,
        checkIdExist,
        getCount,
        getUserAgg,
        getUser,
        findOne,
        getUserNoPaging,
        removeUser,
        updateMany,
        find,
        updateOne,
        bulkWrite,
        getUserByUsername,
        login
    }
}
