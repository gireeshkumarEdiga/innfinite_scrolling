(
    () => {
        let nextpage = 1;
        const content = document.querySelector(".content");

        function renderUsers(users){
            users.results.map((user) => {
                const element = document.createElement("div");
                element.classList.add("user");
                element.innerHTML = user.name.last;
                content.appendChild(element);
            })
        }

        async function getUsers(page) {
            const users = await (
                await fetch(`https://randomuser.me/api/?page=${page}&results=50`)
            ).json();
            return users;
        }

        async function loadMoreUsers() {
            const { scrollTop, clientHeight, scrollHeight } = content;
            if( scrollHeight - scrollTop === clientHeight){
                const users = await getUsers(nextpage);
                renderUsers(users);
                nextpage +=1;
            }
        }

        loadMoreUsers();
        nextpage+=1;

        content.addEventListener("scroll",loadMoreUsers);
    }
)();