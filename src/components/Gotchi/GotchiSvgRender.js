import Web3 from 'web3';
import { MAIN_CONTRACT, POLYGON_RPC } from "../../api/common/constants";
import { SVG_ABI } from '../../data/abi/svg';

const web3 = new Web3(POLYGON_RPC);
const contract = new web3.eth.Contract(SVG_ABI, MAIN_CONTRACT);

export default { 
    async getSvg(gotchies) {
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
