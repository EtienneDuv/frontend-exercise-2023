import {Image, Popover, OverlayTrigger} from 'react-bootstrap';
import {Placement} from 'react-bootstrap/esm/types';

interface Args {
  svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  tooltipTitle?: string;
  tooltipText?: string;
  placement?: Placement
}

export const TechnoImageTooltip = ({svg, tooltipTitle, tooltipText, placement='right'}: Args) => {
  const svgString = svg.toString();

  const popover = (
    <Popover>
      <Popover.Header as="h2" className='fw-bold'>{tooltipTitle}</Popover.Header>
      <Popover.Body> {tooltipText} </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={placement}
      overlay={popover}
    >
      <Image src={svgString} height={125} className='my-3' />
    </OverlayTrigger>
  );
};