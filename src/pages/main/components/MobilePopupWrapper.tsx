import styled from "styled-components";
import Popup from "reactjs-popup";
import loadable from "@loadable/component";

const Button = loadable(() => import("../../../components/Button"));
const TitledCard = loadable(() => import("../../../components/TitledCard"));

export const MobilePopupWrapper = (props: any) => {
  return (
    <Popup
      trigger={props.trigger}
      modal
      className="modal-mobile"
      closeOnDocumentClick={true}
      closeOnEscape={true}
    >
      {(close: () => void) => (
        <TitledCard
          className="modal-mobile"
          closable
          close={close}
          title={props.title}
          subtitle={props.subtitle}
        >
          <PopupContentStyle {...props}>
            {props.children}
            <Button green cta fullwidth className="btn-ok" onClick={close}>
              <span>OK</span>
            </Button>
          </PopupContentStyle>
        </TitledCard>
      )}
    </Popup>
  );
};

const PopupContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  .mb {
    margin-bottom: var(--px-l);
  }
  .full-width {
    width: 100%;
  }
  .btn-location {
    margin-bottom: var(--px-l);
    padding: 0.6em 1em;
    border-radius: 5px;
  }
  .btn-ok {
    width: 90%;
    justify-content: center;
    align-self: center;
    margin-bottom: 1em;
  }
`;

export default MobilePopupWrapper;