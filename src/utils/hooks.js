import { useEffect, useState } from "react"
import { butterCMS } from "./buttercmssdk";

// load menu items data
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadData = async () => { 
      try {
        const menuItems = await butterCMS.content.retrieve(["navigation_menu"]);
        // Menu items loaded from ButterCMS
        setMenuItems(menuItems.data.data.navigation_menu[0].menu_items)
      }
      catch(err) {
        // do nothing
      }
    }

    loadData()
  }, []);

  return menuItems
}

// load categories
export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => { 
      try {
        const categories = await butterCMS.category.list()
        setCategories(categories.data.data)
      }
      catch(err) {
        // do nothing
      }
    }

    loadData()
  }, []);

  return categories
}
