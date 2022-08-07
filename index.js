import fs from "fs"
import axios from 'axios'

(async () => {
    try {
        console.time('snapshot');

        const alchemyApi = 'https://eth-mainnet.g.alchemy.com/nft/v2/demo/getOwnersForCollection?contractAddress=0xd374410e9bb22f3771ffbd0b40a07c0cf44a04fc&withTokenBalances=true'

        const { data: { ownerAddresses }
        } = await axios.get(alchemyApi)

        const owners = ownerAddresses.reduce((acc, curr) => {
            return acc += `${curr.ownerAddress}, ${curr.tokenBalances[0].balance}\r\n`
        }, '')

        fs.writeFileSync(`./snapshot_${Date.now()}.csv`, owners)

        console.timeEnd('snapshot');
    } catch (err) {
        console.error(err);
    }
})()
