/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2024-01-12 11:45:30
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2024-01-12 13:31:52
 * @Description: 
 */
import { useEffect, useState } from 'react'
import { getLabels } from '@/apis'
import { Select } from 'antd'
const Label: React.FC<{ onChange?: (value: Array<string>) => void }> = ({ onChange }) => {
    const [labels, setLabels] = useState([])
    const SelectProps = {
        onChange: (val) => { onChange(val) },
        maxTagCount: 1,
        style: {
            width: 197
        },

        options: labels,
        placeholder: "标签"
    }
    useEffect(() => {
        getLabels().then(res => {
            setLabels(res.data.map(item => ({
                label: item.name,
                value: item.id
            })))
        })
    }, [])
    return (
        <Select {...SelectProps} mode="multiple" />
    )
}

export default Label