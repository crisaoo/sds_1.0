package com.devsuperior.dspesquisa.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dspesquisa.dto.RecordDTO;
import com.devsuperior.dspesquisa.dto.RecordInsertDTO;
import com.devsuperior.dspesquisa.entities.Game;
import com.devsuperior.dspesquisa.entities.Record;
import com.devsuperior.dspesquisa.repositories.GameRepository;
import com.devsuperior.dspesquisa.repositories.RecordRepository;

@Service
public class RecordService {
	@Autowired
	private RecordRepository repository;
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert(RecordInsertDTO objInsDTO) {
		Record entity = instantiateRecord(objInsDTO);
		entity = repository.save(entity);
		
		return new RecordDTO(entity);
	}
	
	
	private Record instantiateRecord (RecordInsertDTO obj) {
		String name = obj.getName();
		Integer age = obj.getAge();
		Instant moment = Instant.now();
		Game game = gameRepository.getOne(obj.getGameId());
		
		return new Record(null, name, age, moment, game);
	}
}
