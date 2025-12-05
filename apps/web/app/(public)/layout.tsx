import { ReactNode } from 'react'
import { Box } from '@mui/material'

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* TODO: Adicionar Header/Navbar */}
            <main>{children}</main>
            {/* TODO: Adicionar Footer */}
        </Box>
    )
}
