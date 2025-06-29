
# SeaKing - Island Defense Strategy Game

## 🌊 Game Overview

SeaKing is a captivating island defense strategy game built with **Cocos Creator 2.4.8**. Players must protect their island from attacks by other SeaKings while building and upgrading their own fortress. The game combines tower defense mechanics with resource management and hero collection systems.

### 🎮 Core Gameplay Features

- **🏰 Base Building & Upgrading**: Construct and upgrade various buildings including towers, barracks, garrisons, and specialized structures
- **⚔️ Strategic Combat**: Deploy heroes and defensive structures to protect your island from enemy invasions
- **👥 Hero Collection**: Recruit, train, and upgrade different types of heroes with unique abilities and skills
- **🏝️ Island Management**: Manage resources, expand territory, and optimize your island's defenses
- **🎯 PvP Battles**: Attack other players' islands to earn rewards and climb the rankings
- **📋 Quest System**: Complete various tasks and achievements to progress through the game

## 🏗️ Project Structure

```
SeaKing/
├── assets/                     # Game assets and scenes
│   ├── add_desktop/            # Desktop shortcut functionality
│   ├── book/                   # Item encyclopedia and information
│   ├── buildFunction/          # Building mechanics and barracks
│   ├── buy/                    # In-game shop and purchases
│   ├── common/                 # Shared resources and configurations
│   │   └── configs/            # Game configuration files
│   ├── debug/                  # Development and debugging tools
│   ├── fight/                  # Battle system and combat mechanics
│   ├── guide/                  # Tutorial and guidance system
│   ├── guideGift/             # Tutorial rewards
│   ├── ladder/                 # Ranking and leaderboard system
│   ├── loading/                # Game loading screens
│   ├── login/                  # User authentication
│   ├── lucky_wheel/            # Fortune wheel mini-game
│   ├── mail/                   # In-game messaging system
│   ├── map/                    # Island maps and terrain
│   ├── record/                 # Battle records and replays
│   ├── settings/               # Game settings and preferences
│   ├── sign/                   # Daily login rewards
│   ├── special_build/          # Special buildings and upgrades
│   ├── start/                  # Game initialization
│   ├── start-scene/            # Main game scene and UI
│   ├── store/                  # Premium shop
│   ├── super_recruit/          # Hero recruitment system
│   ├── task/                   # Mission and quest system
│   └── test/                   # Testing utilities
├── settings/                   # Project build settings
├── library/                    # Compiled game libraries
├── temp/                       # Temporary build files
└── packages/                   # Third-party packages
```

## 🎯 Key Game Systems

### 🏰 Building System
- **Tower (Main Building)**: The heart of your island that determines maximum building levels
- **Barracks**: Recruit and train heroes for battle
- **Garrison**: Deploy defensive heroes to protect your island
- **Seagoing Boat**: Manage your attacking fleet capacity
- **Wharf Tax**: Generate passive income from trade
- **Private Housing**: Increase population and resources
- **Mining Wells, Sawmills, Workshops**: Resource production buildings

### ⚔️ Combat System
- **Real-time Strategy Combat**: Heroes move and attack automatically based on AI
- **Hero Types**: Attack heroes, defense heroes, and super heroes with unique abilities
- **Skill System**: Heroes can cast powerful skills during battle
- **Pathfinding**: Advanced A* pathfinding for realistic unit movement
- **Building Defense**: Towers and walls automatically attack invading enemies

### 👥 Hero Management
- **Hero Collection**: Collect and upgrade various heroes with different rarities
- **Star System**: Enhance heroes by increasing their star level
- **Skill Progression**: Level up hero skills for increased effectiveness
- **Formation Strategy**: Deploy heroes strategically for optimal defense

### 🎮 Platform Support
The game supports multiple mini-game platforms:
- **WeChat Mini-Game (WXMiniGame)**
- **TikTok Mini-Game (TTMiniGame)**
- **QQ Mini-Game (QQMiniGame)**
- **OPPO Mini-Game (OPPOMiniGame)**
- **VIVO Mini-Game (VIVOMiniGame)**
- **DreamWorks Mini-Game (DWMiniGame)**

## 🛠️ Technical Architecture

### 🎯 Core Managers
- **GameManager**: Central game state management and system coordination
- **UIManager**: User interface management and panel transitions
- **DataManager**: Game data persistence and synchronization
- **AudioManager**: Sound effects and background music control
- **ChannelManager**: Platform-specific functionality and SDK integration
- **ConfigManager**: Game configuration and balance data management

### 🗂️ Data Management
- **Local Storage**: Player progress and settings saved locally
- **Server Synchronization**: Cloud save functionality for cross-device play
- **Configuration System**: JSON-based game balance and content configuration

### 🎨 UI Framework
- **Module-based UI**: Reusable UI components and panels
- **ListView Components**: Efficient scrollable lists for inventories and menus
- **Animation System**: Smooth transitions and visual effects
- **Responsive Design**: Adaptable to different screen sizes and orientations

## 🚀 Development Setup

### Prerequisites
- **Cocos Creator 2.4.8** or compatible version
- **Node.js** (for development tools)
- **TypeScript** support enabled

### Installation
1. Clone the repository
2. Open the project in Cocos Creator
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build and run the project in Cocos Creator

### Development Tools
- **Debug Mode**: Enable in-game debugging features
- **Hot Reload**: Real-time code updates during development
- **Asset Pipeline**: Automated asset processing and optimization

## 📱 Build Configuration

### Supported Platforms
- **Web Browser**: HTML5 deployment
- **Mobile**: iOS and Android native builds
- **Mini-Games**: WeChat, TikTok, QQ, OPPO, VIVO platforms

### Build Settings
- **Encryption**: JavaScript encryption enabled for code protection
- **Compression**: Asset compression for optimal performance
- **Orientation**: Landscape mode optimized
- **Resolution**: Adaptive scaling for multiple screen sizes

## 🎮 Game Features

### 🏆 Progression System
- **Level-based Progression**: Unlock new content as you advance
- **Achievement System**: Complete challenges for rewards
- **Daily Rewards**: Login bonuses and daily missions
- **Ranking System**: Compete with other players globally

### 💰 Economy System
- **Multiple Currencies**: Gold, gems, and special resources
- **Resource Management**: Collect and spend resources strategically
- **Shop System**: Purchase items, heroes, and upgrades
- **Trading**: Exchange resources and items

### 🎪 Mini-Games
- **Lucky Wheel**: Spin for random rewards
- **Special Events**: Limited-time challenges and bonuses
- **Guild System**: Team up with other players
- **PvP Tournaments**: Competitive multiplayer events

## 🌐 Localization

The game supports multiple languages with a focus on:
- **Vietnamese**: Primary language support
- **English**: International audience
- **Chinese**: Regional market support

## 📈 Performance Optimization

- **Object Pooling**: Efficient memory management for game objects
- **Asset Bundling**: Optimized resource loading
- **Compression**: Reduced file sizes for faster downloads
- **Platform-specific Optimizations**: Tailored performance for each platform

## 🤝 Contributing

This is a commercial game project. For development inquiries or contributions, please contact the development team.

## 📄 License

Proprietary software. All rights reserved.

## 🔧 Technical Notes

- **Engine**: Cocos Creator 2.4.8 (JavaScript/TypeScript)
- **Architecture**: Component-based entity system
- **Data Format**: JSON configuration files
- **Encryption**: XXTea encryption for code protection
- **Build Target**: Multi-platform deployment

---

**SeaKing** - Defend your island, build your empire, and become the ultimate Sea King! ⚓👑
