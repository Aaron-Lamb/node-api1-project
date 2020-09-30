let users = [
    {
        id: 1,
        name: "U2",
        bio: "Irish rock band"
    },
    {
        id: 2,
        name: "Genesis",
        bio: "English rock group"
    },
    {
        id: 3,
        name: "Hootie and the Blowfish",
        bio: "Southern rock band"
    }
];

const getUsers = () => {
    return users
};

const getUsersById = (id) => {
    return users.find(user => user.id === id)
};

const createUser = (data) => {
    const payload = {
        id: String(users.length + 1),
        ...data
    }
    users.push(payload);
    return payload;
}

const updateUser = (id, data) => {
	const index = users.findIndex(user => user.id === id);
	users[index] = {
		...users[index],
		...data
	};
	
	return users[index];
}

const deleteUser = (id) => {
    users = users.filter(user => user.id !== id);
}

module.exports = {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
}