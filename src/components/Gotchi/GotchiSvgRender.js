// import Moralis from "moralis";
import Web3 from 'web3';
import Constants from "../../api/common/constants";

const web3 = new Web3(Constants.RPC_URL);
const contract = new web3.eth.Contract(Constants.SVGABI, Constants.TOKEN_ADDRESS);

export default { 
    async getSvg(gotchies) {
        // let result = await Moralis.Cloud.run("getSVG",{gotchies});

        let svgs = [];

        for (let key in gotchies) {
            let cache = await contract.methods.previewAavegotchi(
                    parseInt(gotchies[key].hauntId),
                    gotchies[key].collateral,
                    gotchies[key].numericTraits,
                    gotchies[key].equippedWearables
                ).call();
        
            svgs.push(cache);
        }

        function htmlToElement(html) {
            var template = document.createElement('template');
            html = html.trim();
            template.innerHTML = html;

            return template.content.firstChild;
        }

        return svgs.map((item, index) => {
            let regex = /<style>(.*?)<\/style>/g,
                regexClass = /\.(.*?)\}/g;

            let svgs = item.match(regex).map((val) => {
                return val.replace(/<\/?style>/g,'');
             });
             svgs = svgs[0].match(regexClass).map((styleBlock) => {
                return `.gotchi-svg-${gotchies[index].id} ${styleBlock}`;
             }).join('');

            return htmlToElement(item.replace(regex, `<style>${svgs}</style>`));
        });
    }
}
