package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.propertyregister.PropertyRegister;

import java.util.HashMap;
import java.util.Map;

public class Spaces {
	private static final Map<Integer, Property> spaceToProperty;

	static {
		spaceToProperty = new HashMap<>();
		spaceToProperty.put(1, new Property(PropertyType.DARK_PURPLE, 1));
		spaceToProperty.put(3, new Property(PropertyType.DARK_PURPLE, 2));
		spaceToProperty.put(5, new Property(PropertyType.RAILROAD, 1));
		spaceToProperty.put(6, new Property(PropertyType.LIGHT_BLUE, 1));
		spaceToProperty.put(8, new Property(PropertyType.LIGHT_BLUE, 2));
		spaceToProperty.put(9, new Property(PropertyType.LIGHT_BLUE, 3));
		spaceToProperty.put(11, new Property(PropertyType.PURPLE, 1));
		spaceToProperty.put(12, new Property(PropertyType.UTILITY, 1));
		spaceToProperty.put(13, new Property(PropertyType.PURPLE, 2));
		spaceToProperty.put(14, new Property(PropertyType.PURPLE, 3));
		spaceToProperty.put(15, new Property(PropertyType.RAILROAD, 2));
		spaceToProperty.put(16, new Property(PropertyType.ORANGE, 1));
		spaceToProperty.put(18, new Property(PropertyType.ORANGE, 2));
		spaceToProperty.put(19, new Property(PropertyType.ORANGE, 3));
		spaceToProperty.put(21, new Property(PropertyType.RED, 1));
		spaceToProperty.put(23, new Property(PropertyType.RED, 2));
		spaceToProperty.put(24, new Property(PropertyType.RED, 3));
		spaceToProperty.put(25, new Property(PropertyType.RAILROAD, 3));
		spaceToProperty.put(26, new Property(PropertyType.YELLOW, 1));
		spaceToProperty.put(27, new Property(PropertyType.YELLOW, 2));
		spaceToProperty.put(28, new Property(PropertyType.UTILITY, 2));
		spaceToProperty.put(29, new Property(PropertyType.YELLOW, 3));
		spaceToProperty.put(31, new Property(PropertyType.GREEN, 1));
		spaceToProperty.put(32, new Property(PropertyType.GREEN, 2));
		spaceToProperty.put(34, new Property(PropertyType.GREEN, 3));
		spaceToProperty.put(35, new Property(PropertyType.RAILROAD, 4));
		spaceToProperty.put(37, new Property(PropertyType.BLUE, 1));
		spaceToProperty.put(39, new Property(PropertyType.BLUE, 2));
	}

	private static final Map<Integer, Integer> propertyPrices;

	static {
		propertyPrices = new HashMap<>();
		propertyPrices.put(1, 60);
		propertyPrices.put(3, 60);
		propertyPrices.put(6, 100);
		propertyPrices.put(8, 100);
		propertyPrices.put(9, 120);
		propertyPrices.put(11, 140);
		propertyPrices.put(13, 140);
		propertyPrices.put(14, 160);
		propertyPrices.put(16, 180);
		propertyPrices.put(18, 180);
		propertyPrices.put(19, 200);
		propertyPrices.put(21, 220);
		propertyPrices.put(23, 220);
		propertyPrices.put(24, 240);
		propertyPrices.put(26, 260);
		propertyPrices.put(27, 260);
		propertyPrices.put(29, 280);
		propertyPrices.put(31, 300);
		propertyPrices.put(32, 300);
		propertyPrices.put(34, 320);
		propertyPrices.put(37, 350);
		propertyPrices.put(39, 400);
		propertyPrices.put(5, 200);
		propertyPrices.put(15, 200);
		propertyPrices.put(25, 200);
		propertyPrices.put(35, 200);
		propertyPrices.put(12, 150);
		propertyPrices.put(28, 150);
	}

	private static final Map<Integer, Integer[]> terrainData;

	static {
		terrainData = new HashMap<>();
		terrainData.put(1, new Integer[]{2, 10, 30, 90, 160, 250, 30, 50});
		terrainData.put(3, new Integer[]{4, 20, 60, 180, 320, 450, 30, 50});
		terrainData.put(6, new Integer[]{6, 30, 90, 270, 400, 550, 50, 50});
		terrainData.put(8, new Integer[]{6, 30, 90, 270, 400, 550, 50, 50});
		terrainData.put(9, new Integer[]{8, 40, 100, 300, 450, 600, 60, 50});
		terrainData.put(11, new Integer[]{10, 50, 150, 450, 625, 750, 70, 100});
		terrainData.put(13, new Integer[]{10, 50, 150, 450, 625, 750, 70, 100});
		terrainData.put(14, new Integer[]{12, 60, 180, 500, 700, 900, 80, 100});
		terrainData.put(16, new Integer[]{14, 70, 200, 550, 750, 950, 90, 100});
		terrainData.put(18, new Integer[]{14, 70, 200, 550, 750, 950, 90, 100});
		terrainData.put(19, new Integer[]{16, 80, 220, 600, 800, 1000, 100, 100});
		terrainData.put(21, new Integer[]{18, 90, 250, 700, 875, 1050, 110, 150});
		terrainData.put(23, new Integer[]{18, 90, 250, 700, 875, 1050, 110, 150});
		terrainData.put(24, new Integer[]{20, 100, 300, 750, 925, 1100, 120, 150});
		terrainData.put(26, new Integer[]{22, 110, 330, 800, 975, 1150, 130, 150});
		terrainData.put(27, new Integer[]{22, 110, 330, 800, 975, 1150, 130, 150});
		terrainData.put(29, new Integer[]{24, 120, 360, 850, 1025, 1200, 140, 150});
		terrainData.put(31, new Integer[]{26, 130, 390, 900, 1100, 1275, 150, 200});
		terrainData.put(32, new Integer[]{26, 130, 390, 900, 1100, 1275, 150, 200});
		terrainData.put(34, new Integer[]{28, 150, 450, 1000, 1200, 1400, 160, 200});
		terrainData.put(37, new Integer[]{35, 175, 500, 1100, 1300, 1500, 175, 200});
		terrainData.put(39, new Integer[]{50, 200, 600, 1400, 1700, 2000, 200, 200});
	}

	private static class Property {
		PropertyType type;
		int rank;

		public Property(PropertyType type, int rank) {
			this.type = type;
			this.rank = rank;
		}
	}

	public static boolean isProperty(int position) {
		return spaceToProperty.containsKey(position);
	}

	public static PropertyType getPropertyType(int position) {
		return spaceToProperty.get(position).type;
	}

	public static Integer getPropertyPrice(int position) {
		return propertyPrices.get(position);
	}

	public static Integer getRent(Game game, int diceRoll) {
		int propertyId = game.getPlayers().get(game.getPlayerTurn()).getPosition();
		assertIsProperty(propertyId);
		return switch (getPropertyType(propertyId)) {
			case UTILITY -> getUtilityRent(diceRoll, hasMonopoly(game, PropertyType.UTILITY));
			case RAILROAD -> getRailroadRent(game);
			default -> getTerrainRent(game);
		};
	}

	public static Integer getTerrainRent(Game game) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		int propertyId = currentPlayer.getPosition();
		int numberOfHouses = game.getPropertyRegister().getNumberOfHouses(currentPlayer.getPosition());
		int rent = terrainData.get(propertyId)[numberOfHouses];
		PropertyType propertyType = spaceToProperty.get(propertyId).type;
		return numberOfHouses == 0 && hasMonopoly(game, propertyType) ? 2 * rent : rent;
	}

	public static Integer getUtilityRent(int diceRoll, boolean tenTimesDice) {
		return tenTimesDice ? 10 * diceRoll : 4 * diceRoll;
	}

	public static Integer getRailroadRent(Game game) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		Player owner = game.getPropertyRegister().getOwner(currentPlayer.getPosition());
		int numberOfRailroads = getNumberOfOwnedTerrainTypes(owner, game.getPropertyRegister(), PropertyType.RAILROAD);
		return 25 * (int) Math.pow(2, numberOfRailroads - 1);
	}

	public static Integer getTerrainMortgageValue(int position) {
		assertIsTerrain(position);
		return terrainData.get(position)[6];
	}

	public static Integer getTerrainHouseCost(int position) {
		assertIsTerrain(position);
		return terrainData.get(position)[7];
	}

	private static void assertIsTerrain(int position) {
		assertIsProperty(position);
		Property property = spaceToProperty.get(position);
		if (property.type == PropertyType.RAILROAD || property.type == PropertyType.UTILITY) {
			throw new RuntimeException("Property is not a terrain!");
		}
	}

	private static void assertIsProperty(int position) {
		Property property = spaceToProperty.get(position);
		if (property == null) {
			throw new RuntimeException("Player is position is not a property!");
		}
	}

	public static boolean hasMonopoly(Game game, PropertyType propertyType) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		Player owner = game.getPropertyRegister().getOwner(currentPlayer.getPosition());
		int numberOfProperties = getNumberOfOwnedTerrainTypes(owner, game.getPropertyRegister(), propertyType);
		switch (propertyType) {
			case RAILROAD:
				return false;
			case DARK_PURPLE:
			case BLUE:
			case UTILITY:
				return numberOfProperties == 2;
			default:
				return numberOfProperties == 3;
		}
	}

	private static Integer getNumberOfOwnedTerrainTypes(Player owner, PropertyRegister propertyRegister,
																		 PropertyType propertyType) {
		int numberOfProperties = 0;
		for (Map.Entry<Integer, Property> entry : spaceToProperty.entrySet()) {
			if (entry.getValue().type == propertyType && owner.equals(propertyRegister.getOwner(entry.getKey()))) {
				numberOfProperties++;
			}
		}
		return numberOfProperties;
	}
}
