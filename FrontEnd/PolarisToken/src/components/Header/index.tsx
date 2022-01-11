import { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
//import { SvgIcon } from "../../common/SvgIcon";
import { AltButton } from "../../common/Buttons/altButton";
//import { BlackButton } from "../../common/Buttons/BlackButton";
import "antd/dist/antd.css";
import "./index.css";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
  GlowImg,
} from "./styles";

function Header(){
  const [visible, setVisibility] = useState(false);

  
 /* const { active, account, library, connector, activate, deactivate } = useWeb3React()
  <Button onClick={connect} >Connect to MetaMask</Button>
      {active ? <p>Connected with {account}</p> : <p>no funca la wea</p>}
      <Button onClick={disconnect} >Disconnect</Button>
  */
  useLocation()
  var Home = true;
  if((window.location.href.indexOf("/Farms") > -1))
  {
    Home = false
  }
  if((window.location.href.indexOf("/Locker") > -1))
  {
    Home = false
  }

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const RedirectItem = () => {
    
    return (
      <>
        <CustomNavLinkSmall
          style={{ width: "140px" }}
        >
          <Span>
          <div className="dropdown" style={{float:"left"}}>
            <AltButton>
              <div style={{width:"128px"}}>dApps</div>
            </AltButton>
            <div className="dropdown-content">
            <Link to="/Locker">Liquidity Locker</Link>
            <Link to="/Farms">Farms</Link>
              <a href="https://www.aurorapunks.art" target="_blank" rel="noreferrer">AuroraPunks</a>
              { Home ? 
        <></>
        :
        <><Link to="/">Back to Landing</Link></>
        }
            
            </div>
          </div>
           {/* >
          </Link>*/}
          </Span>
        </CustomNavLinkSmall>
        
  
        
        
  
        
      </>
    );
    }

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
      
    };
    return (
      <>
          
          <CustomNavLinkSmall >
            <a href="https://swap.auroraswap.finance/#/swap?outputCurrency=0x631edd14bb0b2505c91176feedc5f082d27dd5b8" target="_blank" rel="noreferrer">
              <Span>Buy</Span>
            </a>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall >
            <a href="https://dexscreener.com/aurora/0x51a5bb6882c56de7e3c508c2ab9d3bd24740a7a7" target="_blank" rel="noreferrer">
              <Span>Chart</Span>
            </a>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall >
            <a style={{textDecoration:'none'}} href="https://t.me/PolarisTokenEntry" target="_blank" rel="noreferrer">
            <Span>Telegram</Span>
            </a>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall >
            <a style={{textDecoration:'none'}} href="https://twitter.com/PolarisToken" target="_blank" rel="noreferrer">
            <Span>Twitter</Span>
            </a>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall >
            <a href="https://medium.com/@Polaris_Token" target="_blank" rel="noreferrer">
              <Span>Medium</Span>
            </a>
          </CustomNavLinkSmall>
          
          {/*<CustomNavLinkSmall >
            <a href="https://gateway.boba.network/">
              <Span>Bridge</Span>
            </a>
          </CustomNavLinkSmall>*/}
          { Home ? 
        <><CustomNavLinkSmall onClick={() => scrollTo("about")}>
        <Span style={{color:"#fff"}}>About</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("tokenomics")}>
        <Span style={{color:"#fff"}}>Tokenomics</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("roadmap")}>
          <Span style={{color:"#fff"}}>Roadmap</Span>
        </CustomNavLinkSmall></>
        :
        <></>
        }
          
              


      </>
    );
  };

  return (

    
    <HeaderSection style={{zIndex:5}}>
      <Container>
        <Row justify="space-between">
          <Col span={4} >
          <LogoContainer to="/" aria-label="homepage" >
            <GlowImg src="logoalt.png" alt="logoalt.png" style={{display: "block",maxWidth:"171px",maxHeight:"72px",width:"auto",height:"auto"}} /> 
          </LogoContainer>
          </Col>
          
          <Col span={12}  style={{justifyContent:"center"}}>
          <NotHidden>

              <MenuItem />
              

            </NotHidden>
          </Col>
          <Col span={4} >
          <NotHidden>
            <RedirectItem/>
          </NotHidden>
          </Col>

          
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <Col span={12}>
          <RedirectItem/>
          <MenuItem />
            
          </Col>
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
