/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { DeviceSelectionScreen } from './components/DeviceSelectionScreen';
import { StartScreen } from './components/StartScreen';
import { MapScreen } from './components/MapScreen';
import { ZoneScreen } from './components/ZoneScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { CloudTransition } from './components/CloudTransition';
import { VerticalProgress } from './components/VerticalProgress';
import { GeneralKnowledge } from './components/GeneralKnowledge';
import { FallingLeaves } from './components/FallingLeaves';
import { Avatar, Zone, mapZones } from './data/gameData';
import { AnimatePresence } from 'motion/react';

type GameState = 'device_selection' | 'start' | 'map' | 'zone' | 'summary';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('device_selection');
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>('desktop');
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState<Avatar | null>(null);
  const [completedZones, setCompletedZones] = useState<string[]>([]);
  const [currentZone, setCurrentZone] = useState<Zone | null>(null);
  const [score, setScore] = useState(0);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextState, setNextState] = useState<GameState | null>(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  useEffect(() => {
    if (gameState === 'map') {
      window.scrollTo(0, 0);
    }
  }, [gameState]);

  // Removed localStorage persistence so reloading resets the game
  const triggerTransition = (targetState: GameState) => {
    setNextState(targetState);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    if (nextState) {
      setGameState(nextState);
      setNextState(null);
      window.scrollTo(0, 0);
      // Let the clouds stay for a moment then disappear
      setTimeout(() => setIsTransitioning(false), 200);
    }
  };

  const handleStart = (name: string, avatar: Avatar) => {
    setPlayerName(name);
    setPlayerAvatar(avatar);
    triggerTransition('map');
  };

  const handleSelectZone = (zone: Zone) => {
    setCurrentZone(zone);
    setGameState('zone');
  };

  const handleZoneComplete = (scoreEarned: number) => {
    if (currentZone && !completedZones.includes(currentZone.id)) {
      const newCompleted = [...completedZones, currentZone.id];
      setCompletedZones(newCompleted);
      setScore(prev => prev + scoreEarned);
      
      if (newCompleted.length === mapZones.length) {
        triggerTransition('summary');
      } else {
        setGameState('map');
      }
    } else {
      setGameState('map');
    }
    setCurrentZone(null);
  };

  const handleRestart = () => {
    setCompletedZones([]);
    setScore(0);
    setCurrentZone(null);
    triggerTransition('map');
  };

  return (
    <div className={`min-h-screen bg-paper text-ink font-sans selection:bg-primary/20 relative ${
      deviceType === 'mobile' && gameState === 'map' ? 'h-screen overflow-hidden' : ''
    }`}>
      <FallingLeaves />
      <CloudTransition 
        isActive={isTransitioning} 
        onTransitionComplete={handleTransitionComplete} 
      />

      {/* Main Game Area */}
      <>
        {gameState === 'device_selection' && (
          <DeviceSelectionScreen onSelect={(device) => {
            setDeviceType(device);
            triggerTransition('start');
          }} />
        )}

          {gameState === 'start' && (
            <StartScreen onStart={handleStart} />
          )}

          {gameState === 'map' && (
            <MapScreen 
              completedZones={completedZones} 
              onSelectZone={handleSelectZone}
              onOpenKnowledge={() => setShowKnowledge(true)}
              deviceType={deviceType}
            />
          )}

          {gameState === 'zone' && currentZone && (
            <ZoneScreen 
              zone={currentZone} 
              onClose={() => setGameState('map')}
              onComplete={handleZoneComplete}
              userAvatar={playerAvatar}
            />
          )}

          {gameState === 'summary' && playerAvatar && (
            <SummaryScreen 
              playerName={playerName}
              avatar={playerAvatar}
              score={score}
              onRestart={handleRestart}
            />
          )}
        </>

      {/* Modals */}
      <AnimatePresence>
        {showKnowledge && (
          <GeneralKnowledge onClose={() => setShowKnowledge(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
