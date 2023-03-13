import { MainApi } from 'api';

export const renderSvg = async (gotchies) => {
  const svgs: CustomAny[] = [];

  for (const key in gotchies) {
    const cache: CustomAny = await MainApi.previewAavegotchi(
      parseInt(gotchies[key].hauntId),
      gotchies[key].collateral,
      gotchies[key].numericTraits,
      gotchies[key].equippedWearables
    );

    svgs.push(cache);
  }

  function htmlToElement(html: CustomAny) {
    const template: CustomAny = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
  }

  return svgs.map((item, index) => {
    const regex = /<style>(.*?)<\/style>/g,
      regexClass = /\.(.*?)\}/g;

    let svgs: CustomAny[] = item.match(regex).map((val: CustomAny) => {
      return val.replace(/<\/?style>/g, '');
    });

    svgs = svgs[0]
      .match(regexClass)
      .map((styleBlock: CustomAny) => {
        return `.gotchi-svg-${gotchies[index].id} ${styleBlock}`;
      })
      .join('');

    return htmlToElement(item.replace(regex, `<style>${svgs}</style>`));
  });
};
