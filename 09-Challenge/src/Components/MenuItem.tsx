import { useState } from "react";
import {Link} from 'react-router-dom'
import { NaryNode } from "../Classes/NodeN";

interface MenuItemProp{
    item:NaryNode;
}

export const MenuItem =({item}:MenuItemProp)=> {
    const hasChildren = item.children.length > 0;
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="sidebar-item">
            {item.link && !hasChildren ? (
                <Link to={item.link} className="sidebar-link">
                    {item.title}
                </Link>
            ) : (
                <div className="sidebar-heading" onClick={hasChildren ? toggleSubmenu : undefined}>
                    <span>{item.title}</span>
                    {hasChildren && <span className="sidebar-toggle">{isOpen ? '−' : '+'}</span>}
                </div>
            )}

            {hasChildren && isOpen && (
                <ul className="sidebar-sublist">
                    {item.children.map((child, index) => (
                        <MenuItem key={child.id ?? index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};