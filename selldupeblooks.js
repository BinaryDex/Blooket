async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

async function getBlooks(blooketName) {
    const response = await fetch('https://api.blooket.com/api/users/blooks?name=' + blooketName, {
        headers: {
            "referer": "https://www.blooket.com/",
            "content-type": "application/json",
            "authorization": localStorage.token
        }
    });
    const data = await response.json();

    return data
};

async function sellDupeBlooks() {
    const myToken = localStorage.token.split('JWT ')[1];
    const blooketName = await getName(myToken);
    const blooks = await getBlooks(blooketName);

    for (const [blook, val] of Object.entries(blooks).filter(i => i[1] > 1).map(i => [i[0], i[1] - 1])) {
        const response = await fetch('https://api.blooket.com/api/users/sellblook', {
            method: "PUT",
            headers: {
                "referer": "https://www.blooket.com/",
                "content-type": "application/json",
                "authorization": localStorage.token
            },
            body: JSON.stringify({
                blook: blook,
                name: blooketName,
                numSold: val
            })
        });

        if (response.status == 200) {
            alert('Sold dupe blooks!')
        } else {
            alert('An error occured.')
        };
    };
};

sellDupeBlooks();
