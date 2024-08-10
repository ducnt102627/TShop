import React from 'react'
import { NavLink } from 'react-router-dom'

const MainMenu = () => {
    return (
        <>
            <div className="flex justify-center items-center h-14">
                <NavLink to="/" className="menu-item">Trang chủ</NavLink>
                <NavLink to="/shop" className="menu-item">Sản phẩm</NavLink>
                <NavLink to="/" className="menu-item">Bài viết</NavLink>
                <NavLink to="/" className="menu-item">Hỗ trợ</NavLink>
            </div>
        </>
    )
}

export default MainMenu