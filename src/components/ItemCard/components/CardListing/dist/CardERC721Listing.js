"use strict";
exports.__esModule = true;
exports.CardERC721Listing = void 0;
var KeyboardArrowDown_1 = require("@mui/icons-material/KeyboardArrowDown");
var KeyboardArrowUp_1 = require("@mui/icons-material/KeyboardArrowUp");
var material_1 = require("@mui/material");
var classnames_1 = require("classnames");
var api_1 = require("api");
var Icons_1 = require("components/Icons/Icons");
var CustomTooltip_1 = require("components/custom/CustomTooltip");
var utils_1 = require("utils");
var styles_1 = require("./styles");
function CardERC721Listing(_a) {
    var currentPrice = _a.currentPrice, currentListingId = _a.currentListingId, historicalPrices = _a.historicalPrices;
    var classes = styles_1.styles();
    var lastPrice = historicalPrices.length && api_1.EthersApi.fromWei(historicalPrices[historicalPrices.length - 1]);
    return (React.createElement(React.Fragment, null, currentListingId || historicalPrices.length ? (React.createElement(CustomTooltip_1.CustomTooltip, { title: (historicalPrices === null || historicalPrices === void 0 ? void 0 : historicalPrices.length) ? (React.createElement(React.Fragment, null,
            React.createElement("p", { className: classes.tooltipTitle }, "Sales history:"),
            React.createElement("div", { className: classes.tooltipInner }, historicalPrices.map(function (price, index) { return (React.createElement("p", { className: classes.tooltipItem, key: index },
                utils_1.CommonUtils.formatPrice(api_1.EthersApi.fromWei(price)),
                React.createElement(Icons_1.GhstTokenIcon, { className: classes.token, width: 12, height: 12 }))); })))) : (React.createElement("p", { className: classes.noSales }, "No history")), placement: 'top' }, currentPrice > 0 ? (React.createElement(material_1.Link, { href: "https://app.aavegotchi.com/baazaar/erc721/" + currentListingId, target: '_blank', className: classnames_1["default"](classes.listings) },
        currentPrice === lastPrice ? (React.createElement(material_1.Typography, { className: classes.lastPrice, variant: 'subtitle2' }, utils_1.CommonUtils.formatPrice(currentPrice))) : currentPrice > lastPrice ? (React.createElement(React.Fragment, null,
            React.createElement(KeyboardArrowUp_1["default"], { color: 'success', fontSize: 'inherit' }),
            React.createElement(material_1.Typography, { className: classes.lastPriceUp, variant: 'subtitle2' }, utils_1.CommonUtils.formatPrice(currentPrice)))) : (React.createElement(React.Fragment, null,
            React.createElement(KeyboardArrowDown_1["default"], { color: 'warning', fontSize: 'inherit' }),
            React.createElement(material_1.Typography, { className: classes.lastPriceDown, variant: 'subtitle2' }, utils_1.CommonUtils.formatPrice(currentPrice)))),
        React.createElement(Icons_1.GhstTokenGif, { width: 18, height: 18, className: classes.coin }))) : (React.createElement("div", { className: classnames_1["default"](classes.listings) },
        React.createElement(material_1.Typography, { variant: 'subtitle2', className: classes.error }, "No listings"))))) : (React.createElement("div", { className: classnames_1["default"](classes.listings) },
        React.createElement(material_1.Typography, { variant: 'subtitle2', className: classes.error }, "No listings")))));
}
exports.CardERC721Listing = CardERC721Listing;
