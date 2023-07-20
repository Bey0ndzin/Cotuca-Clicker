import { useState } from "react"
import "../App.css"

import mestre from '../assets/seller.png'

import shop from '../scripts/shop'
import tt from '../scripts/tooltip'
import script from '../scripts/script'
import upgrade from '../scripts/upgrade'

export default function SectionRight() {
    const [upgradeId0, setUpgrade0] = useState(0);
    const [upgradeId1, setUpgrade1] = useState(11);
    const [upgradeId2, setUpgrade2] = useState(17);
    return (
        <div className="sectionRight">
            <div id="shopIcon" style={{ width: '300px', textAlign: 'center', paddingBottom: '0px', position: 'relative', zIndex: '100', height: 'auto !important' }}>
                <img src={mestre} alt=""></img>
            </div>
            <div className="store">
                <div className="storeTitle">Mestre Kawara Nofuro</div>
                <div id="upgrades" className="storeSection upgradeBox">
                    <div onClick={() => { if(upgrade.UpgradesById[upgradeId0].click(event) && upgradeId0 < 10) setUpgrade0(upgradeId0+1)}} className="crate upgrade locked" onMouseOut={() => { tt.SetOnCrate(0); tt.Tooltip.shouldHide = 1; tt.Tooltip.hide(); }} onMouseOver={() => { if (!tt.mouseDown) { tt.SetOnCrate(script.get(upgrade0)); tt.Tooltip.dynamic = 1; tt.Tooltip.draw(this, function () { return function () { return tt.CrateTooltip(upgrade.UpgradesById[upgradeId0], 'store'); }(); }, 'store'); } }} id='upgrade0' style={{ backgroundPosition: '-576px -192px' }}></div>
                    <div onClick={() => { if(upgrade.UpgradesById[upgradeId1].click(event) && upgradeId1 < 16) setUpgrade1(upgradeId1+1)}} className="crate upgrade locked" onMouseOut={() => { tt.SetOnCrate(1); tt.Tooltip.shouldHide = 1; tt.Tooltip.hide(); }} onMouseOver={() => { if (!tt.mouseDown) { tt.SetOnCrate(script.get(upgrade1)); tt.Tooltip.dynamic = 1; tt.Tooltip.draw(this, function () { return function () { return tt.CrateTooltip(upgrade.UpgradesById[upgradeId1], 'store'); }(); }, 'store'); } }} id="upgrade1" style={{ backgroundPosition: '-576px -192px' }}></div>
                    <div onClick={() => { if(upgrade.UpgradesById[upgradeId2].click(event) && upgradeId2 < 20) setUpgrade2(upgradeId2+1)}} className="crate upgrade locked" onMouseOut={() => { tt.SetOnCrate(2); tt.Tooltip.shouldHide = 1; tt.Tooltip.hide(); }} onMouseOver={() => { if (!tt.mouseDown) { tt.SetOnCrate(script.get(upgrade2)); tt.Tooltip.dynamic = 1; tt.Tooltip.draw(this, function () { return function () { return tt.CrateTooltip(upgrade.UpgradesById[upgradeId2], 'store'); }(); }, 'store'); } }} id="upgrade2" style={{ backgroundPosition: '-576px -192px' }}></div>
                </div>
                <div id="products" className="storeSection">
                    <div id="storeBulk" className="storePre">
                        <div id="storeBulkBuy" className="storePreButton storeBulk Mode selected" onClick={() => { shop.storeBulkButton(0); }}>Comprar</div>
                        <div id="storeBulk1" className="storePreButton storeBulkAmount selected" onClick={() => { shop.storeBulkButton(1); }}>1</div>
                        <div id="storeBulk10" className="storePreButton storeBulkAmount" onClick={() => { shop.storeBulkButton(2); }}>10</div>
                        <div id="storeBulk100" className="storePreButton storeBulkAmount" onClick={() => { shop.storeBulkButton(3); }}>100</div>
                    </div>

                    <div className="product unlocked" id="product0" onClick={() => {shop.Item(0)}}>
                        <div className="icon" id="productIcon0"></div>
                        <div className="content">
                            <div className="title productName" id="productName0">Espada</div>
                            <span className="price" id="productPrice0">R$5</span>
                            <div className="title owned" id="productOwned0">0</div>
                        </div>
                    </div>

                    <div id="product1" className="product locked" onClick={() => {shop.Item(1)}}>
                        <div className="icon" id="productIcon1"></div>
                        <div className="content">
                            <div className="title productName" id="productName1">Escudo</div>
                            <span className="price" id="productPrice1">R$50</span>
                            <div className="title owned" id="productOwned1">0</div>
                        </div>
                    </div>

                    <div id="product2" className="product locked" onClick={() => {shop.Item(2)}}>
                        <div className="icon" id="productIcon2"></div>
                        <div className="content">
                            <div className="title productName" id="productName2">Armadura</div>
                            <span className="price" id="productPrice2">R$120</span>
                            <div className="title owned" id="productOwned2">0</div>
                        </div>
                    </div>

                    <div id="product3" className="product locked" onClick={() => {shop.Item(3)}}>
                        <div className="icon" id="productIcon3"></div>
                        <div className="content">
                            <div className="title productName" id="productName3">Bota</div>
                            <span className="price" id="productPrice3">R$500</span>
                            <div className="title owned" id="productOwned3">0</div>
                        </div>
                    </div>

                    <div id="product4" className="product locked" onClick={() => {shop.Item(4)}}>
                        <div className="icon" id="productIcon4"></div>
                        <div className="content">
                            <div className="title productName" id="productName4">Arco</div>
                            <span className="price" id="productPrice4">R$1,500</span>
                            <div className="title owned" id="productOwned4">0</div>
                        </div>
                    </div>

                    <div id="product5" className="product locked" onClick={() => {shop.Item(5)}}>
                        <div className="icon" id="productIcon5"></div>
                        <div className="content">
                            <div className="title productName" id="productName5">Cajado</div>
                            <span className="price" id="productPrice5">R$5,000</span>
                            <div className="title owned" id="productOwned5">0</div>
                        </div>
                    </div>

                    <div id="product6" className="product locked" onClick={() => {shop.Item(6)}}>
                        <div className="icon" id="productIcon6"></div>
                        <div className="content">
                            <div className="title productName" id="productName6">Elfo</div>
                            <span className="price" id="productPrice6">R$15,000</span>
                            <div className="title owned" id="productOwned6">0</div>
                        </div>
                    </div>

                    <div id="product7" className="product locked" onClick={() => {shop.Item(7)}}>
                        <div className="icon" id="productIcon7"></div>
                        <div className="content">
                            <div className="title productName" id="productName7">Orc</div>
                            <span className="price" id="productPrice7">R$50,000</span>
                            <div className="title owned" id="productOwned7">0</div>
                        </div>
                    </div>

                    <div id="product8" className="product locked" onClick={() => {shop.Item(8)}}>
                        <div className="icon" id="productIcon8"></div>
                        <div className="content">
                            <div className="title productName" id="productName8">Sérgio</div>
                            <span className="price" id="productPrice8">R$100,000</span>
                            <div className="title owned" id="productOwned8">0</div>
                        </div>
                    </div>

                    <div id="product9" className="product locked" onClick={() => {shop.Item(9)}}>
                        <div className="icon" id="productIcon9"></div>
                        <div className="content">
                            <div className="title productName" id="productName9">Simone</div>
                            <span className="price" id="productPrice9">R$500,000</span>
                            <div className="title owned" id="productOwned9">0</div>
                        </div>
                    </div>

                    <div id="product10" className="product locked" onClick={() => {shop.Item(10)}}>
                        <div className="icon" id="productIcon10"></div>
                        <div className="content">
                            <div className="title productName" id="productName10">Patrícia</div>
                            <span className="price" id="productPrice10">R$1.000 million</span>
                            <div className="title owned" id="productOwned10">0</div>
                        </div>
                    </div>

                    <div id="product11" className="product locked" onClick={() => {shop.Item(11)}}>
                        <div className="icon" id="productIcon11"></div>
                        <div className="content">
                            <div className="title productName" id="productName11">Sampaio</div>
                            <span className="price" id="productPrice11">R$2.500 million</span>
                            <div className="title owned" id="productOwned11">0</div>
                        </div>
                    </div>

                    <div id="product12" className="product locked" onClick={() => {shop.Item(12)}}>
                        <div className="icon" id="productIcon12"></div>
                        <div className="content">
                            <div className="title productName" id="productName12">Maligno</div>
                            <span className="price" id="productPrice12">R$5.000 million</span>
                            <div className="title owned" id="productOwned12">0</div>
                        </div>
                    </div>

                    <div id="product13" className="product locked" onClick={() => {shop.Item(13)}}>
                        <div className="icon" id="productIcon13"></div>
                        <div className="content">
                            <div className="title productName" id="productName13">Boletim</div>
                            <span className="price" id="productPrice13">R$100.000 million</span>
                            <div className="title owned" id="productOwned13">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}