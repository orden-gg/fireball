import mainApi from 'api/main.api';

const renderSvg = async (gotchies) => {
    let svgs = [];

    for (let key in gotchies) {
        let cache = await mainApi.previewAavegotchi(
            parseInt(gotchies[key].hauntId),
            gotchies[key].collateral,
            gotchies[key].numericTraits,
            gotchies[key].equippedWearables
        );

        svgs.push(cache);
    }

    function htmlToElement(html) {
        var template = document.createElement('template');
        template.innerHTML = html.trim();

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

export default renderSvg;
