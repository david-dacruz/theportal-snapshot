import fs from "fs"
import axios from 'axios'
import { stringify } from 'csv';


(async () => {
    try {
        const r = await axios.get('https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection?contractAddress=0xd374410e9bb22f3771ffbd0b40a07c0cf44a04fc&withTokenBalances=true')

        const owners = [];

        for (let i = 0; i < r.data.ownerAddresses.length; i++) {
            owners.push([r.data.ownerAddresses[i].ownerAddress, r.data.ownerAddresses[i].tokenBalances[0].balance]);
        }

        stringify(owners, { header: false }, (err, out) => {
            if (err) throw err
            fs.writeFileSync('./snapshot.csv', out)
        });

    } catch (err) {
        console.error(err);
    }
})()
