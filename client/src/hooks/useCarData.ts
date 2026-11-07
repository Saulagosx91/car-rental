import { useState, useEffect } from 'react';
import { BrandService, MotorizationService, TransmissionService } from '../services';
import type { Specification } from '../types';

const brandService = new BrandService();
const motorizationService = new MotorizationService();
const transmissionService = new TransmissionService();

export function useCarData() {
  const [carData, setCarData] = useState<{
    brands: Specification[],
    motorization: Specification[],
    transmission: Specification[],
    isLoading: boolean
  }
  >({
    brands: [],
    motorization: [],
    transmission: [],
    isLoading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const [brandsResponse, motorizationsResponse, transmissionsResponse] = await Promise.all([
        brandService.find(),
        motorizationService.find(),
        transmissionService.find()
      ]);
      
      setCarData(prev => ({
        ...prev,
        brandsResponse,
        motorization: motorizationsResponse,
        transmission: transmissionsResponse,
        isLoading: false
      }));
    };

    loadData();
  }, []);

  return carData;
}