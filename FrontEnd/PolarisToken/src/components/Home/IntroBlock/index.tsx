import { Row, Col } from "antd";
import { SvgIcon } from "../../../common/SvgIcon";
import { Button } from "../../../common/Buttons/Button";
import { AltButton } from "../../../common/Buttons/altButton";
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import {
  RightBlockContainer,
  Content,
  //ContentWrapper,
  Cimg,
} from "./styles";
/*

*/
const RightBlock = () => {
  return (
    
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
      <FadeIn >
        <Row style={{justifyContent:"center"}} >
        <Col lg={11} md={11} sm={12} xs={24}>
            <Cimg src={"logo.png"} alt="logo.png" width="268px" height="268px" style={{}} />
          </Col>
          </Row>
          <Row style={{justifyContent:"center"}} >
          <Col lg={11} md={11} sm={11} xs={24} style={{justifyContent:"center"}}>
              <h6 style={{color:"#fff", textShadow:"2px 4px 8px rgba(255,255,255,0.5)",textAlign:"center"}}>$PLRS</h6>
              <Content style={{textAlign:"center"}} >Polaris Token, pioneering Aurora, one step at a time.</Content>
              <Row style={{justifyContent:"center"}}>
                <Col  style={{justifyContent:"center",paddingRight:"10px"}}>
                  <div style={{width:"128px"}}><Link to="/Locker"><AltButton>Liquidity Locker </AltButton></Link></div>
                </Col>
                
                <Col  style={{justifyContent:"center", paddingRight:"10px"}}>
                  <div style={{width:"128px"}}><Link to="/Farms"><AltButton>Farms </AltButton></Link></div>
                </Col>
                <Col  style={{justifyContent:"center", paddingRight:"10px"}}>
                  <a href="https://www.aurorapunks.art" target="_blank" rel="noreferrer">
                  <div style={{width:"128px"}}><AltButton>AuroraPunks <img src={"/img/0.svg"} alt="punk" width="24px" height="24px" /></AltButton></div>
                  </a>
                </Col>
                </Row>
                <Row style={{justifyContent:"center"}} >
                  <Col lg={12} md={24} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://swap.auroraswap.finance/#/swap?outputCurrency=0x631edd14bb0b2505c91176feedc5f082d27dd5b8" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Buy <img src="/img/auroraswap.png" alt="auroraswap" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://t.me/PolarisTokenEntry" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Telegram <SvgIcon src="tg.png" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                </Row>
                <Row style={{justifyContent:"center"}}>
                  <Col lg={8} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://twitter.com/PolarisToken" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Twitter <SvgIcon src="tw.png" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://dexscreener.com/aurora/0x51a5bb6882c56de7e3c508c2ab9d3bd24740a7a7" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Chart <SvgIcon src="chart.jpg" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                </Row>
          </Col>
          
        </Row>
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;
