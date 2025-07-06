"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Hospital, Stethoscope, Loader2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

export default function LocationButtons() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setIsLoading(false);
                },
                () => {
                    setError('Unable to retrieve your location. Please enable location services in your browser settings.');
                    setIsLoading(false);
                },
                { timeout: 10000 }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
            setIsLoading(false);
        }
    }, []);

    const openMaps = (query: string) => {
        if (location) {
            window.open(`https://www.google.com/maps/search/${query}/@${location.latitude},${location.longitude},14z`, '_blank');
        } else {
            window.open(`https://www.google.com/maps/search/${query}`, '_blank');
        }
    };
    
    if (isLoading) {
        return (
             <Card className="glassmorphism">
                <CardContent className="p-6 flex items-center justify-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="ml-3 text-muted-foreground">Getting your location...</p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="glassmorphism bg-destructive/80">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className="glassmorphism">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Button onClick={() => openMaps('hospitals')} size="lg" variant="outline" className="bg-transparent hover:bg-primary/10">
                    <Hospital className="mr-2 h-5 w-5" />
                    Find Nearby Hospitals
                </Button>
                <Button onClick={() => openMaps('doctors')} size="lg" variant="outline" className="bg-transparent hover:bg-primary/10">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Find Nearby Doctors
                </Button>
            </CardContent>
        </Card>
    );
}
