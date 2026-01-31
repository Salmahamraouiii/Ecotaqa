# 🔐 Identifiants de Test - Ecotaqa

## Comptes Disponibles

### 👤 Compte Admin
```
Email:    admin@ecotaqa.com
Password: admin
Rôle:     ADMIN
```

### 👤 Compte Demo
```
Email:    demo@ecotaqa.com
Password: demo123
Rôle:     USER
```

## 🚀 Comment Se Connecter

1. Accédez à : **http://localhost:3001/login**
2. Utilisez l'un des comptes ci-dessus
3. Vous serez redirigé vers le dashboard

## ⚙️ Configuration Actuelle

### Authentification
- **Provider**: NextAuth avec CredentialsProvider
- **Stratégie**: JWT (pas de session serveur)
- **Sécurité**: ⚠️ Mots de passe en clair (pour dev uniquement)

### Base de Données
- **Type**: SQLite
- **Fichier**: `prisma/dev.db`
- **ORM**: Prisma 5.22.0

## 🔧 Commandes Utiles

### Réinitialiser les Utilisateurs
```bash
npx tsx prisma/seed.ts
```

### Voir les Utilisateurs en Base
```bash
npx prisma studio
```
Puis naviguez vers le modèle `User`

### Ajouter un Nouvel Utilisateur
```typescript
// Utilisez prisma/seed.ts comme modèle
await prisma.user.create({
  data: {
    email: 'votre@email.com',
    password: 'votreMotDePasse',
    name: 'Votre Nom',
    role: 'USER',
  }
});
```

## ⚠️ Important - Production

Pour la production, vous DEVEZ :
1. ✅ Hasher les mots de passe (bcrypt, argon2)
2. ✅ Utiliser des variables d'environnement pour les secrets
3. ✅ Configurer `NEXTAUTH_SECRET` dans `.env`
4. ✅ Implémenter la validation des emails
5. ✅ Ajouter la récupération de mot de passe

## 📝 Notes

- Les comptes sont créés automatiquement par le script `prisma/seed.ts`
- Le fallback admin fonctionne même si la DB est vide
- Les sessions JWT expirent selon la config NextAuth par défaut (30 jours)
