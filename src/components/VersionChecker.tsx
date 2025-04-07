'use client'

import { useEffect, useRef } from 'react'

export default function VersionChecker() {
    const versionRef = useRef<string | null>(null)

    useEffect(() => {
        const checkVersion = async () => {
            try {
                const res = await fetch('/version.txt', { cache: 'no-store' })
                const version = await res.text()

                if (versionRef.current && versionRef.current !== version) {
                    console.log('🟡 Nova versão detectada. Recarregando...')
                    window.location.reload()
                }

                versionRef.current = version
            } catch (err) {
                console.error('Erro ao checar versão:', err)
            }
        }

        checkVersion()
        const interval = setInterval(checkVersion, 300) // verifica a cada 30 segundos
        return () => clearInterval(interval)
    }, [])

    return null
}
