import React, { useState } from 'react'
import BackHeader from '../../components/layout/BackHeader'
import CreateItemModel from '../../components/modals/CreateItemModel';

const MenuManagment = () => {
    const [showModel, setShowModel] = useState(false);
    const AddNewItem = <button onClick={() => setShowModel(true)} className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg ">Add Item</button>
    return (
        <div className="flex flex-col">
            <BackHeader title="Menu Managment" RightComponent={AddNewItem} />

            {showModel &&
                <CreateItemModel onClose={() => setShowModel(false)} />
            }
        </div>
    )
}

export default MenuManagment