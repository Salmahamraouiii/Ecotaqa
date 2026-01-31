# 📊 Sources de Données - Ecotaqa

## Vue d'Ensemble

L'application Ecotaqa utilise **deux types de données** :
1. **Données en Base de Données** (SQLite via Prisma)
2. **Données Mock/Simulées** (dans les API routes)

---

## 🗄️ 1. Données en Base de Données

### Fichier de Seed Principal
**Fichier**: `prisma/seed.ts`

Ce script peuple la base de données SQLite avec des données de démonstration.

### Données Créées

#### Utilisateurs
```typescript
// Admin
{
  email: 'admin@ecotaqa.com',
  password: 'admin',
  name: 'Admin Ecotaqa',
  role: 'ADMIN',
  energyScore: 95,
  points: 1250
}

// Demo User
{
  email: 'demo@ecotaqa.com',
  password: 'demo123',
  name: 'Demo User',
  role: 'USER',
  energyScore: 85,
  points: 500
}
```

#### Entreprise
```typescript
{
  name: 'Ecotaqa Industries',
  industry: 'Manufacturing',
  subscription: 'PREMIUM'
}
```

#### Bâtiments
```typescript
[
  {
    name: 'Siège Social Casablanca',
    address: 'Boulevard Mohammed V, Casablanca'
  },
  {
    name: 'Usine Tanger',
    address: 'Zone Industrielle, Tanger'
  }
]
```

#### Départements
```typescript
[
  { name: 'Bureau Principal', buildingId: 'building-1' },
  { name: 'Ligne de Production A', buildingId: 'building-2' }
]
```

#### Régions du Maroc
```typescript
[
  { name: 'Casablanca-Settat', latitude: 33.5731, longitude: -7.5898, status: 'HIGH' },
  { name: 'Rabat-Salé-Kénitra', latitude: 34.0209, longitude: -6.8416, status: 'MEDIUM' },
  { name: 'Marrakech-Safi', latitude: 31.6295, longitude: -7.9811, status: 'LOW' },
  { name: 'Tanger-Tétouan-Al Hoceïma', latitude: 35.7595, longitude: -5.834, status: 'MEDIUM' },
  { name: 'Fès-Meknès', latitude: 34.0181, longitude: -5.0078, status: 'CRITICAL' }
]
```
**Source**: Coordonnées GPS réelles des capitales régionales du Maroc

#### Données de Consommation
```typescript
// 24 heures de données historiques
for (let i = 0; i < 24; i++) {
  {
    value: Math.random() * 50 + 10,  // 10-60 kWh
    cost: Math.random() * 10 + 2,    // 2-12 €
    timestamp: now - (i * 1 heure)
  }
}
```

#### Alertes
```typescript
[
  {
    message: 'Pic de consommation détecté dans le Bureau Principal',
    type: 'SPIKE',
    severity: 'WARNING'
  },
  {
    message: 'Heures de pointe approchent (18:00)',
    type: 'INFO',
    severity: 'INFO'
  }
]
```

#### Badges de Gamification
```typescript
[
  { name: 'Économe d\'Énergie', description: 'Réduction de 10% de la consommation', iconUrl: '🌱' },
  { name: 'Série Hebdomadaire', description: 'Consommation basse pendant 7 jours', iconUrl: '🔥' },
  { name: 'Oiseau de Nuit', description: 'Utilisation en heures creuses', iconUrl: '🦉' },
  { name: 'Champion Vert', description: 'Score d\'efficacité > 90%', iconUrl: '🏆' }
]
```

#### Objectifs de Durabilité
```typescript
[
  {
    type: 'REDUCTION',
    targetValue: 20,      // 20% de réduction
    currentValue: 12,     // 12% atteint
    unit: '%',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'ACTIVE'
  },
  {
    type: 'EFFICIENCY',
    targetValue: 95,      // 95% d'efficacité
    currentValue: 85,     // 85% actuel
    unit: '%',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    status: 'ACTIVE'
  }
]
```

#### Conseils Énergétiques
```typescript
[
  {
    title: 'Éteignez les lumières',
    content: 'Économisez jusqu\'à 15% en éteignant les lumières inutilisées',
    category: 'Office',
    audience: 'USER'
  },
  {
    title: 'Optimisez la climatisation',
    content: 'Réglez la température à 22°C pour un confort optimal et des économies',
    category: 'Office',
    audience: 'USER'
  },
  {
    title: 'Maintenance préventive',
    content: 'Un équipement bien entretenu consomme 20% de moins',
    category: 'Industrial',
    audience: 'ADMIN'
  }
]
```

#### Leçons Éducatives
```typescript
[
  {
    title: 'Introduction à l\'Efficacité Énergétique',
    content: 'Apprenez les bases de la gestion énergétique',
    pointsReward: 50
  },
  {
    title: 'Heures de Pointe et Tarification',
    content: 'Comprenez comment optimiser votre consommation',
    pointsReward: 75
  },
  {
    title: 'Énergies Renouvelables',
    content: 'Découvrez les options vertes pour votre entreprise',
    pointsReward: 100
  }
]
```

---

## 🔄 2. Données Mock dans les API Routes

### `/api/dashboard` - Dashboard Summary
**Fichier**: `src/app/api/dashboard/route.ts`

```typescript
// Données calculées depuis la DB + mock
{
  summary: {
    totalUsage: 1250,        // kWh (calculé depuis Consumption)
    totalCost: 180,          // € (calculé depuis Consumption)
    efficiencyScore: 85,     // % (mock)
    activeAlerts: 0          // count (depuis Alert table)
  },
  chartData: [
    // 24 points de données avec timestamps
    { timestamp, value, cost }
  ]
}
```

### `/api/alerts` - Alertes
**Fichier**: `src/app/api/alerts/route.ts`

```typescript
[
  {
    id: 'a1',
    message: 'High energy usage detected in Office B',
    type: 'SPIKE',
    severity: 'WARNING',
    createdAt: timestamp
  },
  {
    id: 'a2',
    message: 'Wait! Peak hours approaching (18:00)',
    type: 'INFO',
    severity: 'INFO',
    createdAt: timestamp
  }
]
```

### `/api/map` - Données Régionales
**Fichier**: `src/app/api/map/route.ts`

```typescript
[
  {
    id: '1',
    name: 'Casablanca-Settat',
    latitude: 33.5731,
    longitude: -7.5898,
    status: 'HIGH',
    consumption: 450
  },
  // ... 4 autres régions
]
```
**Source**: Coordonnées GPS officielles des régions du Maroc

### `/api/gamification` - Leaderboard & Badges
**Fichier**: `src/app/api/gamification/route.ts`

```typescript
{
  leaderboard: [
    // Utilisateurs réels depuis la DB
    { id, name, points, badges }
  ],
  availableBadges: [
    { id: 'b1', name: 'Energy Saver', description: '...', icon: '🌱' },
    { id: 'b2', name: 'Week Streak', description: '...', icon: '🔥' },
    { id: 'b3', name: 'Night Owl', description: '...', icon: '🦉' }
  ],
  userPoints: 0,
  userBadges: []
}
```

### `/api/monitor` - Monitoring en Temps Réel
**Fichier**: `src/app/api/monitor/route.ts`

```typescript
{
  timestamp: new Date(),
  value: Math.floor(Math.random() * 500 + 100),  // 100-600 kWh
  unit: 'kWh',
  status: 'HIGH' | 'MEDIUM' | 'LOW'
}
```

### `/api/analytics` - Analyses Historiques
**Fichier**: `src/app/api/analytics/route.ts`

```typescript
{
  success: true,
  data: {
    history: [
      { name: 'Jan', usage: 4000, waste: 240 },
      { name: 'Feb', usage: 3000, waste: 139 },
      // ... 7 mois
    ],
    stats: {
      efficiencyScore: 92,
      projectedCost: 1240.5,
      potentialSavings: 156
    }
  }
}
```

---

## 📍 3. Données Géographiques

### Coordonnées GPS des Régions Marocaines
**Source**: Données officielles géographiques

| Région | Latitude | Longitude | Ville Principale |
|--------|----------|-----------|------------------|
| Casablanca-Settat | 33.5731 | -7.5898 | Casablanca |
| Rabat-Salé-Kénitra | 34.0209 | -6.8416 | Rabat |
| Marrakech-Safi | 31.6295 | -7.9811 | Marrakech |
| Tanger-Tétouan-Al Hoceïma | 35.7595 | -5.834 | Tanger |
| Fès-Meknès | 34.0181 | -5.0078 | Fès |

---

## 🎲 4. Algorithmes de Génération

### Consommation Aléatoire
```typescript
// Valeur entre 10 et 60 kWh
value = Math.random() * 50 + 10

// Coût entre 2 et 12 €
cost = Math.random() * 10 + 2
```

### Statut de Consommation
```typescript
if (value < 200) status = 'LOW'
else if (value < 350) status = 'MEDIUM'
else if (value < 500) status = 'HIGH'
else status = 'CRITICAL'
```

---

## 📂 Fichiers Sources Principaux

1. **`prisma/seed.ts`** - Script de seed de la base de données
2. **`src/app/api/dashboard/route.ts`** - API Dashboard
3. **`src/app/api/alerts/route.ts`** - API Alertes
4. **`src/app/api/map/route.ts`** - API Carte
5. **`src/app/api/gamification/route.ts`** - API Gamification
6. **`src/app/api/monitor/route.ts`** - API Monitoring
7. **`src/app/api/analytics/route.ts`** - API Analytics

---

## 🔄 Comment Modifier les Données

### Modifier les Données de Base
```bash
# Éditer le fichier de seed
nano prisma/seed.ts

# Réinitialiser la base de données
rm prisma/dev.db
npx prisma db push
npx tsx prisma/seed.ts
```

### Modifier les Données Mock des API
Éditez directement les fichiers dans `src/app/api/*/route.ts`

---

## 📊 Résumé des Sources

| Type de Données | Source | Fichier |
|----------------|--------|---------|
| Utilisateurs | Base de données | `prisma/seed.ts` |
| Bâtiments | Base de données | `prisma/seed.ts` |
| Régions | Coordonnées GPS réelles | `prisma/seed.ts` + `api/map/route.ts` |
| Consommation | Générée aléatoirement | `prisma/seed.ts` + `api/monitor/route.ts` |
| Alertes | Mock | `api/alerts/route.ts` |
| Badges | Mock | `prisma/seed.ts` + `api/gamification/route.ts` |
| Analytics | Mock | `api/analytics/route.ts` |

**Note**: Toutes les données sont actuellement des données de démonstration. Pour une utilisation en production, vous devrez connecter des sources de données réelles (capteurs IoT, compteurs intelligents, etc.).
