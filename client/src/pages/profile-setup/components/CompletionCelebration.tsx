import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CompletionCelebration = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        color: ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)]
    }));

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {confettiPieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: piece.color,
                                left: `${piece.x}%`,
                                top: '-10px'
                            }}
                            initial={{ y: -10, rotate: 0, opacity: 1 }}
                            animate={{
                                y: window.innerHeight + 10,
                                rotate: 360,
                                opacity: 0
                            }}
                            transition={{
                                duration: piece.duration,
                                delay: piece.delay,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="max-w-md mx-auto px-4 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-elevated">
                        <Icon name="CheckCircle" size={48} color="white" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="space-y-4 mb-8"
                >
                    <h1 className="text-3xl font-bold text-foreground">
                        🎉 Profile Complete!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Awesome! Your learning profile is now ready and you're all set to find your perfect study partner.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="space-y-6 mb-8"
                >
                    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold text-foreground">What happens next?</h3>
                        <div className="space-y-3 text-left">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icon name="Search" size={12} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">AI-Powered Matching</p>
                                    <p className="text-xs text-muted-foreground">Our AI will analyze your profile and find compatible learning partners</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icon name="Users" size={12} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Browse Matches</p>
                                    <p className="text-xs text-muted-foreground">Review suggested partners and send connection requests</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icon name="MessageCircle" size={12} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Start Learning</p>
                                    <p className="text-xs text-muted-foreground">Connect with partners and begin your learning journey together</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="space-y-4"
                >
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => navigate('/profile-match')}
                    >
                        <Icon name="ArrowRight" size={24} />
                        Find My Learning Partners
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        You can always update your profile later from your dashboard
                    </p>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 left-10 text-4xl"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    🚀
                </motion.div>

                <motion.div
                    className="absolute top-32 right-16 text-3xl"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    ⭐
                </motion.div>

                <motion.div
                    className="absolute bottom-32 left-16 text-3xl"
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    🎯
                </motion.div>
            </div>
        </div>
    );
};

export default CompletionCelebration;