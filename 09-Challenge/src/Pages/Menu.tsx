import { MenuItem } from "../Components/MenuItem";
import { NaryNode } from "../Classes/NodeN";

interface MenuProps {
    root: NaryNode | null;
}

export const Menu = ({ root }: MenuProps) => {
    if (!root) return null;

    return (
        <nav className="sidebar-nav">
            <div className="sidebar-brand">
                <span>Mi Panel</span>
            </div>
            <ul className="sidebar-list">
                {root.children.map((item, index) => (
                    <MenuItem key={item.id ?? index} item={item} />
                ))}
            </ul>
        </nav>
    );
};