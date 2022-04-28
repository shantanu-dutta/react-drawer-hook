import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';

import './styles.css';
import useMountTransition from './useMountTransition';

function createPortalRoot() {
  const drawerRoot = document.createElement('div');

  drawerRoot.setAttribute('id', 'drawer-root');

  return drawerRoot;
}

const Drawer = ({
  isOpen,
  children,
  className,
  onClose,
  position = 'left',
  removeWhenClosed = true,
}) => {
  const bodyRef = useRef(document.querySelector('body'));
  const portalRootRef = useRef(
    document.getElementById('drawer-root') || createPortalRoot()
  );

  const isTransitioning = useMountTransition(isOpen, 300);

  // append portal on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);

    const body = bodyRef.current;
    const portal = portalRootRef.current;

    return () => {
      // clean up portal when drawer is unmounted
      portal.remove();

      // ensure scroll overflow is removed
      body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const updatePageScroll = () => {
      bodyRef.current.style.overflow = isOpen ? 'hidden' : '';
    };
    updatePageScroll();
  }, [isOpen]);

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keyup', onKeyPress);
    }

    return () => {
      window.removeEventListener('keypress', onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <FocusTrap active={isOpen}>
      <div
        aria-hidden={isOpen ? 'false' : 'true'}
        className={cn('drawer-container', {
          open: isOpen,
          in: isTransitioning,
          className,
        })}
      >
        <div className={cn('drawer', position)} role="dialog">
          {children}
        </div>
        <div className="backdrop" onClick={onClose}></div>
      </div>
    </FocusTrap>,
    portalRootRef.current
  );
};

export default Drawer;
