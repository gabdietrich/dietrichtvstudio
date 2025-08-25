# Estrutura de Vídeos

## Organização das Pastas

### `/desktop/`
Vídeos em alta resolução para visualização em desktop
- Recomendado: 1920x1080 ou superior
- Formato: MP4 (H.264)
- Bitrate: 5-10 Mbps

### `/mobile/`
Vídeos otimizados para dispositivos móveis
- Recomendado: 720x720 (quadrado) ou 720x1280
- Formato: MP4 (H.264)
- Bitrate: 2-5 Mbps
- Arquivo menor para economia de dados

## Como adicionar vídeos

1. Coloque os vídeos de alta qualidade na pasta `desktop/`
2. Coloque as versões otimizadas na pasta `mobile/`
3. Mantenha os mesmos nomes de arquivo em ambas as pastas
4. Atualize as URLs nos dados do projeto em `src/components/WorkPage.tsx`

## Exemplo de estrutura:
```
public/videos/
├── desktop/
│   ├── scene1.mp4
│   ├── scene2.mp4
│   └── scene3.mp4
└── mobile/
    ├── scene1.mp4
    ├── scene2.mp4
    └── scene3.mp4
```

## Configuração no código

Os vídeos são configurados no array `mockWorks` em `WorkPage.tsx`:

```javascript
{
  id: 1,
  title: "Scene 1",
  videoUrl: "/videos/desktop/scene1.mp4",
  mobileVideoUrl: "/videos/mobile/scene1.mp4"
}
```
