const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			signup: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
			try {
				const resp = await fetch('https://magdalenapizarroo-congenial-waddle-pvqw74jrqpx3794j-3001.preview.app.github.dev/api/signup', opts)
				if (resp.status != 200) {
					alert("There has been some error");
					return false;
				}
				const data = await resp.json();
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token});
				return true
			}
			catch(error) {
				console.error("There has been an error signing up", error)
			}
			},
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token })

			},
			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				try {
					const resp = await fetch('https://magdalenapizarroo-congenial-waddle-pvqw74jrqpx3794j-3001.preview.app.github.dev/api/login', opts)
					if (resp.status !== 200) {
						alert("There has been an error");
						return false
					};
					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token })
					return true
				}
				catch (error) {
					console.error("There has been an error login in")
				}
			},
			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null })
				window.location.reload()
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				const store = getStore();
				const opts ={
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}

		}
	};
};

export default getState;